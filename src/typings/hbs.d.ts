declare module '*.hbs' {
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { TemplateDelegate } from 'handlebars';

  declare const template: TemplateDelegate;

  export default template;
}
