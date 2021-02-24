<template>
  <v-container>
    <v-row justify="space-around">
      <v-card style="overflow-y: scroll; height: 96vh">
        <v-img height="200px" src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg">
          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img alt="user" src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg" />
            </v-avatar>
            <p class="ml-3">John Doe</p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">账户信息</div>

          <v-timeline align-top dense>
            <v-timeline-item color="orange" small>
              <div>
                <div class="font-weight-normal"><strong>用户ID</strong> {{ this.userInfo.uid }}</div>
              </div>
            </v-timeline-item>
            <v-timeline-item small>
              <div>
                <div class="font-weight-normal">
                  <v-row>
                    <v-col cols="3">
                      <v-img src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"></v-img>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col cols="3">
                      <v-file-input
                        label="上传头像"
                        @change="uploadImg"
                        chips
                        ref="image"
                        accept="image/*"
                        show-size
                        small-chips
                        truncate-length="15"
                      ></v-file-input>
                    </v-col>
                    <v-col>
                      <v-btn color="blue">上传</v-btn>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item small color="red">
              <div>
                <div class="font-weight-normal"><strong>用户名</strong> {{ this.userInfo.username }}</div>
                <v-row align="center">
                  <v-col cols="5">
                    <v-text-field v-model="username" counter></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-btn color="blue" @click="updateInfo('username')"> 更新 </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-timeline-item>
            <v-timeline-item small color="pink">
              <div>
                <div class="font-weight-normal"><strong>邮箱</strong> {{ this.userInfo.email }}</div>
              </div>
            </v-timeline-item>
            <v-timeline-item small>
              <div>
                <div class="font-weight-normal"><strong>手机号码</strong> {{ this.userInfo.phone }}</div>
                <v-row align="center">
                  <v-col cols="5">
                    <v-text-field v-model="phone" counter></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-btn color="blue" @click="updateInfo('phone')"> 更新 </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-timeline-item>
            <v-timeline-item small>
              <div>
                <div class="font-weight-normal"><strong>重置密码</strong></div>
                <v-row align="center">
                  <v-col cols="5">
                    <v-text-field type="password" label="旧密码" v-model="oldPassword"></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col cols="5">
                    <v-text-field type="password" label="新密码" v-model="newPassword"></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-btn color="blue" @click="resetPassword"> 重置 </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
    <my-snackbar v-model="message"></my-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { UserInfo } from '@/utils/http/getInfo';
import { upload } from '@/utils/http/uploadImg';
import { update } from '@/utils/http/update';
import MySnackbar, { Message } from '@/components/common/mySnackbar.vue';
import { modifyPassword } from '@/utils/http/modifyPassword';

interface UserProfileContentState {
  userInfo: UserInfo; // 用户信息
  username: string; // 用户名
  phone: string; // 手机号
  oldPassword: string; // 旧密码
  newPassword: string; // 新密码
  /**
   * 消息条
   * */
  message: Message;
}

interface UserProfileContentMethod {
  /**
   * 上传图片
   **/
  uploadImg(el: any): void;

  /**
   * 更新个人信息
   **/
  updateInfo(name: string): void;

  /**
   * 打开消息条
   * */
  openMessage(message: string): void;

  /**
   * 密码重置
   **/
  resetPassword(): void;
}

export default Vue.extend<UserProfileContentState, UserProfileContentMethod, {}, {}>({
  name: 'userProfileContent',

  components: { MySnackbar },

  data: () => ({
    userInfo: {
      uid: 1,
      email: '',
      username: 'undefined',
      password: '123',
      phone: null,
      level: 1,
      avatar: null,
      accessToken: '',
    },
    username: '',
    phone: '',
    newPassword: '',
    oldPassword: '',
    message: {
      message: '',
      open: false,
    },
  }),

  methods: {
    uploadImg(e) {
      console.log(e);
      const file = e;
      if (file !== undefined) {
        if (file.name.lastIndexOf('.') <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener('load', () => {
          upload(file);
        });
      }
    },
    updateInfo(name: string): void {
      let info = '';
      // let avatar = '';
      switch (name) {
        case 'avatar':
          break;
        case 'phone':
          if (this.phone === '' || this.phone === this.userInfo.phone) {
            return;
          }
          info = this.phone;
          break;
        case 'username':
          if (this.username === '' || this.username === this.userInfo.username) {
            return;
          }
          info = this.username;
          break;
      }

      update(name, info)
        .then((res) => {
          this.openMessage('更新成功');
          this.userInfo.res[name];
        })
        .catch((err: Error) => {
          console.log(err);
          this.openMessage(String(err));
        });
    },
    openMessage(message: string): void {
      this.message = {
        message,
        open: true,
      };
    },
    resetPassword() {
      if (this.oldPassword === this.newPassword) this.openMessage('新旧密码不能相同！');
      modifyPassword(this.newPassword, this.oldPassword)
        .then((res) => {
          console.log(res);
          this.openMessage('密码重置成功！');
        })
        .catch((err) => {
          this.openMessage(String(err));
        });
    },
  },

  mounted() {
    this.userInfo = this.$store.state.userInfo;
    if (this.userInfo.phone) {
      this.phone = this.userInfo.phone;
    }
    this.username = this.userInfo.username;
    if (!this.userInfo.avatar) {
      this.userInfo.avatar = 'https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg';
    }
  },
});
</script>

<style lang="scss" scoped></style>
