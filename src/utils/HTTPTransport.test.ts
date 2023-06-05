import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './HTTPTransport';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new HTTPTransport('/auth');
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('.get() should send GET request', () => {
    instance.get('/user');

    const [request] = requests;

    expect(request.method).to.eq('Get');
  });

  it('.post() should send POST request', () => {
    instance.post('/user');

    const [request] = requests;

    expect(request.method).to.eq('Post');
  });

  it('.delete() should send DELETE request', () => {
    instance.delete('/Chat');

    const [request] = requests;

    expect(request.method).to.eq('Delete');
  });

  it('.Put() should send PUT request', () => {
    instance.put('/user', {});

    const [request] = requests;

    expect(request.method).to.eq('Put');
  });

  it('.Patch() should send Patch request', () => {
    instance.patch('/user', {});

    const [request] = requests;

    expect(request.method).to.eq('Patch');
  });
});
