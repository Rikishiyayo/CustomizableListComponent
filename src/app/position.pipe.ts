import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'position'
})
export class PositionPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    switch (value) {
      case 'Goalkeeper':
        return 'GK';
      case 'Defender':
        return 'D';
      case 'Midfielder':
        return 'M';
      case 'Forward':
        return 'F';
      default:
        return 'N/A';
    }
  }

}
