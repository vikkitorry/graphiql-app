import { http, HttpResponse } from 'msw';
import { schemaResponseMock } from '../../mocks/schemaMock';

export const handlers = [
  http.post('https://schema', async () => {
    return HttpResponse.json(schemaResponseMock, { status: 200 });
  }),
  http.post('https://wrongURL', async () => {
    return HttpResponse.json(null, { status: 404 });
  }),
];
