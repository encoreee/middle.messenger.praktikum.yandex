import { LinkLabelBase } from './index';
import { expect } from 'chai';
import Router from '../../utils/Router';
import sinon from 'sinon';

describe('Link', () => {
  it('should render', () => {
    new LinkLabelBase({ to: '/', label: 'LinkLabel', router: Router });
  });

  it('element should return span', () => {
    const link = new LinkLabelBase({
      to: '/',
      label: 'LinkLabel',
      router: Router,
    });
    const element = link.element;

    expect(element).to.be.instanceof(window.HTMLAnchorElement);
  });

  it('should go to passed route on click', () => {
    const link = new LinkLabelBase({
      to: '/',
      label: 'LinkLabel',
      router: Router,
    });
    const spy = sinon.spy(Router, 'go');
    const element = link.element as HTMLAnchorElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });
});
