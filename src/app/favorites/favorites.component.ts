import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomVirtualScrollStrategy } from './scroll.service';

import { ProfileService } from '../profile/profile.service';
import { NodeService } from '../node/node.service'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[{
    provide: VIRTUAL_SCROLL_STRATEGY,
    useClass: CustomVirtualScrollStrategy
  },
  ProfileService]
})
export class FavoritesComponent implements OnInit {

  favForm = new FormGroup({
    newchannel: new FormControl('', Validators.required)
  });
  
  constructor(
    public dialogRef:MatDialogRef<FavoritesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private profile:ProfileService,
    private nodeService:NodeService) {
    }

  ngOnInit(): void {
  }

  addFav() {
    const channel:number = +this.favForm.get('newchannel')?.value;

    this.data.fav.push(channel);

    this.favForm.get('newchannel')?.setValue("");
    this.profile.NewFavCommand(channel).subscribe();
  }

  delFav(i: number) {
    this.data.fav.splice(i, 1);
    this.profile.RemoveFav(this.data.fav).subscribe();
  }

}
