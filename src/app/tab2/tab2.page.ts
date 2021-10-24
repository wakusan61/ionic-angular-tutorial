import { Component } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Photo,PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public photoService: PhotoService,
              public actionSheetController: ActionSheetController) {}

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  async addPhotoToGallery() {
    await this.photoService.addNewToGallery();
  }

  public async showActionSheet(photo:Photo, position: number) {
    const actionSeet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
            this.photoService.deletePicture(photo, position);
          }
        },{
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {}
        }]
    });
    await actionSeet.present();
  }

}
