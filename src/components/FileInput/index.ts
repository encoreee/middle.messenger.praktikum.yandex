import Block from '../../utils/Block';
import template from './fileInput.hbs';
import styles from './styles.module.pcss';

interface FileInputProps {
  id: string;
  name?: string;
}

export class FileInput extends Block<FileInputProps> {
  constructor(props: FileInputProps) {
    super({ ...props });
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
