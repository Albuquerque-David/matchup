import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PopoverController, ToastController } from '@ionic/angular';
import { PostsOpComponent } from '../posts-op/posts-op.component';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-card-posts',
  templateUrl: './card-posts.component.html',
  styleUrls: ['./card-posts.component.scss'],
})

export class CardPostsComponent implements OnInit {
  @Input() post;
  posterId: any;
  photo: any;
  username: any;
  loggedId = parseInt(localStorage.getItem('userId'));
  admin = parseInt(localStorage.getItem('admin'));
  isAdmin: boolean = false;
  isSameUser: boolean = false;
  loggedHasPermission: boolean = false;
  shouldFillHeart: boolean = false;
  likes: number;

  constructor(public userService: UserService,
              public popoverController: PopoverController,
              public toastController: ToastController,
              public postService: PostService) {
    this.isAdmin = this.admin === 1;
  }

  ngOnInit() {
    this.getPoster();
    this.showLikes();
    this.getUsersLikes();
  }

  getPoster() {
    this.userService.getUser(this.post.user_id).subscribe(
      (res) => {
        // console.log(res);
        this.posterId = res.id;
        this.photo = res.photo;
        this.username = res.username;

        this.isSameUser = this.loggedId === res.id;
        this.loggedHasPermission = (this.isSameUser || this.isAdmin);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async presentPostsOp(ev: any) {
    const popover = await this.popoverController.create({
      component: PostsOpComponent,
      componentProps: {
        postId: this.post.id,
        isSameUser: this.isSameUser,
      },
      event: ev,
      translucent: true
    });

    return await popover.present();
  }

  likePost() {
    if (localStorage.getItem('userToken')) {
      this.userService.userLike(this.post.id).subscribe(
        (res) => {
          console.log(res);
          this.showLikes();
          this.getUsersLikes();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      console.log('não autorizado');
      this.presentUnauthorizedToast();
    }
  }

  showLikes() {
    this.postService.showLikes(this.post.id).subscribe(
      (res)=> {
        console.log(res);
        this.likes=res;
      },
      (err)=> {
        console.log(err);
      });
  }

  getUsersLikes() {
    // Método extremamente ineficiente de veficar se usuário logado curtiu o post
    this.postService.getUsersLiked(this.post.id).subscribe(
      (res) => {
        console.log(res);
        this.shouldFillHeart = false;
        for (let user of res) {
          if (user.id === this.loggedId) {
            this.shouldFillHeart = true;
          } 
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async presentUnauthorizedToast() {
    const toast = await this.toastController.create({
      message: 'Faça login para curtir o post!',
      duration: 2000
    });
    toast.present();
  }
}
