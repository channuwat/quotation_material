import { Component } from '@angular/core';
import { FirevabseService } from '../services/firevabse.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(fb: FirevabseService) {
    // let data = {
    //   name: 'หมูบด',
    //   unit: 'กก.',
    //   type: 'purchase',
    //   stockQty: 8,
    //   minQty: 15
    // }
    // fb.writeData('materials', data)
    //   .then(() => console.log('Data written successfully'))
    //   .catch((error) => console.error('Error writing data:', error));

    // fb.listenData('materials', (data) => {
    //   console.log('Data received:', data);
    // });
  }

}
