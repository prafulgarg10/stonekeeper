import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatCurrency',
  standalone: true
})
export class FormatCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    if(value==null || value==0){
      return '0';
    }
    return this.editCurrencyWithAppropriateCommas(value);  
  }

  editCurrencyWithAppropriateCommas(val: number):string{
    let res = val.toString();
    let resDecimal = res.split(".");
    let output = '';
    if(resDecimal.length==1){
      output = this.updateStringWithCommas(res);
    }
    else if(resDecimal.length==2){
      output = this.updateStringWithCommas(resDecimal[0]);
      output += "." + resDecimal[1];
    }
    else{
      output = res;
    }
    return output;
  }

  updateStringWithCommas(val: string):string{
    let res = val.toString();
    let size = res.length;
    let finalRes = '';
    if(size>3){
      if(size%2==1){
        for(let i=0;i<(size-3);i=i+2){
          finalRes += res.substring(i,i+2) + ",";
        }
        finalRes += res.substring(size-3,size);
      }
      if(size%2==0){
        finalRes += res.substring(0,1) + ",";
        for(let i=1;i<(size-3);i=i+2){
          finalRes += res.substring(i,i+2) + ",";
        }
        finalRes += res.substring(size-3,size);
      }
    }
    else{
      finalRes = res;
    }
    return finalRes;
  }

}
