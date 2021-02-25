<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>修改信息</v-card-title>
      <v-card-text>
        <v-text-field label="用户名" v-model="newUserName" />
        <v-text-field label="电话号码" v-model="newPhoneNumber" type="phone" />
        <v-hover v-slot="{ hover }">
          <v-avatar @click="clickInput" v-if="hover" v-ripple class="upload-button" size="100">
            <v-file-input accept="image/*" @change="fileUpload" id="input" class="input"></v-file-input>
            <img alt="头像" :src="newAvatar" />
            <span class="upload-info">上传</span>
          </v-avatar>
          <v-avatar v-else size="100">
            <img alt="头像" :src="newAvatar" />
          </v-avatar>
        </v-hover>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="pink darken-1" text @click="dialog = false">取消</v-btn>
        <v-btn color="blue darken-1" text @click="saveChange">保存</v-btn>
      </v-card-actions>
    </v-card>
    <my-snackbar v-model="message"></my-snackbar>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { UserInfo } from '@/utils/http/getInfo';
import { upload } from '@/utils/http/uploadImg';
import MySnackbar, { Message } from '@/components/common/mySnackbar.vue';
import { update } from '@/utils/http/update';

interface UserEditState {
  /**
   * 是否打开修改对话框
   * */
  dialog: boolean;
  /**
   * 新手机号
   * */
  newPhoneNumber: string;
  /**
   * 新用户名
   * */
  newUserName: string;
  /**
   * 新头像
   * */
  newAvatar: string;
  /**
   * 消息条消息
   * */
  message: Message;
}

interface UserEditMethod {
  /**
   * 模拟点击
   * */
  clickInput(): void;

  /**
   * 文件上传
   * */
  fileUpload(files: File): void;

  /**
   * 保存修改
   * */
  saveChange(): void;

  /**
   * 提示
   */
  openMessage(message: string): void;
}

export default Vue.extend<UserEditState, UserEditMethod, {}, {}>({
  name: 'user-edit',
  components: { MySnackbar },
  data(): UserEditState {
    const userInfo = this.$store.state.userInfo as UserInfo;
    return {
      dialog: false,
      newAvatar: userInfo.avatar ?? 'https://pic2.zhimg.com/v2-f857d3d8e4355df7d83a586ad564fc37_xl.jpg',
      newPhoneNumber: userInfo.phone ?? '',
      newUserName: userInfo.username,
      message: { message: '', open: false },
    };
  },
  methods: {
    clickInput(): void {
      document.getElementById('input')?.click();
    },
    fileUpload(files: File): void {
      const formData = new FormData();
      formData.append('file', files);
      upload(formData)
        .then((value) => {
          this.newAvatar = `http://software.remotehost.icu/file/${value}`;
        })
        .catch((res) => {
          console.log(res);
          this.openMessage(res.message);
        });
    },
    openMessage(message: string): void {
      this.message = {
        message,
        open: true,
      };
    },
    saveChange(): void {
      update(this.newUserName, this.newPhoneNumber, this.newAvatar)
        .then((value) => {
          this.$store.commit('login', value);
          this.dialog = false;
        })
        .catch((res) => {
          console.log(res.message);
          this.openMessage(res.message);
        });
    },
  },
});
</script>

<style scoped lang="scss">
.upload-button {
  cursor: pointer;

  position: relative;

  .upload-info {
    background-color: #ffffff50;
    position: absolute;
    width: 100%;
    height: 100%;
    color: #202020;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
  }

  .input {
    display: none;
  }
}
</style>
