'use server';
/* eslint-disable no-console */

import { headers } from 'next/headers';

import { fetchBackend } from '@/lib/api/backend';

export interface PlaygroundResponse {
  status: number;
  statusText: string;
  time: string;
  body: any;
  headers: Record<string, string>;
}

export interface PlaygroundActionResult {
  success: boolean;
  data?: PlaygroundResponse;
  error?: string;
}

export interface KeyValueParam {
  key: string;
  value: string;
}

export interface PlaygroundRequestOptions {
  queryParams?: KeyValueParam[];
  bodyParams?: KeyValueParam[];
  headers?: KeyValueParam[];
}

/**
 * Playground 전용 서버 액션
 * 클라이언트에서 백엔드로 직접 요청하지 않고, 서버를 거쳐 요청함으로써
 * BFF Secret 등의 민감 정보가 브라우저에 노출되는 것을 방지합니다.
 */
export async function executePlaygroundRequest(
  url: string,
  method: string,
  options?: PlaygroundRequestOptions,
): Promise<PlaygroundActionResult> {
  try {
    const start = Date.now();

    // 1. URL Query Parameters 처리
    let finalUrl = url;
    if (options?.queryParams && options.queryParams.length > 0) {
      const urlObj = new URL(url.startsWith('http') ? url : `http://localhost${url}`);
      options.queryParams.forEach((p) => {
        if (p.key.trim()) urlObj.searchParams.append(p.key.trim(), p.value);
      });
      finalUrl = url.startsWith('http') ? urlObj.toString() : urlObj.pathname + urlObj.search;
    }

    // 2. Headers 처리
    const requestHeaders: Record<string, string> = {};
    if (options?.headers) {
      options.headers.forEach((h) => {
        if (h.key.trim()) requestHeaders[h.key.trim()] = h.value;
      });
    }

    // 3. Body 처리 (JSON 형태)
    let requestBody: any = undefined;
    if (
      (method === 'POST' || method === 'PUT' || method === 'PATCH') &&
      options?.bodyParams &&
      options.bodyParams.length > 0
    ) {
      const bodyObj: Record<string, string> = {};
      options.bodyParams.forEach((b) => {
        if (b.key.trim()) bodyObj[b.key.trim()] = b.value;
      });
      if (Object.keys(bodyObj).length > 0) {
        requestBody = JSON.stringify(bodyObj);
        requestHeaders['Content-Type'] = 'application/json';
      }
    }

    const headerList = await headers();
    const clientHeaders = Object.fromEntries(headerList.entries());

    // 서버 로깅 (요청 전)
    console.log('\n[Playground] === API Request ===');
    console.log(`[Playground] ${method} ${finalUrl}`);
    console.log('[Playground] Client -> Next.js Headers (Browser Sent):');
    console.dir(clientHeaders, { depth: null, colors: true });

    if (Object.keys(requestHeaders).length > 0) {
      console.log('[Playground] Next.js -> Backend Custom Headers (User Input):');
      console.dir(requestHeaders, { depth: null, colors: true });
    }
    if (requestBody) {
      console.log('[Playground] Body:');
      console.log(requestBody);
    }
    console.log('=================================\n');

    // fetchBackend는 서버 사이드에서 실행되므로 process.env에 안전하게 접근합니다.
    const res = await fetchBackend(finalUrl, {
      method,
      cache: 'no-store',
      headers: requestHeaders,
      body: requestBody,
      debugBff: true,
    });

    const latency = Date.now() - start;
    const contentType = res.headers.get('content-type');

    let body;
    try {
      if (contentType?.includes('application/json')) {
        body = await res.json();
      } else {
        body = await res.text();
      }
    } catch (e) {
      body = '(바디 파싱 실패)';
    }

    const responseHeaders = Object.fromEntries(res.headers.entries());

    // 서버 로깅 (요청 후)
    console.log('\n[Playground] === API Response ===');
    console.log(`[Playground] Status: ${res.status} ${res.statusText} (${latency}ms)`);
    console.log('[Playground] Response Headers:');
    console.dir(responseHeaders, { depth: null, colors: true });
    console.log('[Playground] Response Body:');
    console.dir(body, { depth: 4, colors: true });
    console.log('==================================\n');

    return {
      success: true,
      data: {
        status: res.status,
        statusText: res.statusText,
        time: `${latency}ms`,
        body,
        headers: responseHeaders,
      },
    };
  } catch (error: any) {
    console.error('[PlaygroundAction] Request Error:', error);
    return {
      success: false,
      error: error.message || '요청 수행 중 오류가 발생했습니다.',
    };
  }
}
