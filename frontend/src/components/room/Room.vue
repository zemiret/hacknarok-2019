<template>
  <div class="room-container">
    <v-container grid-list-x1 text-xs-center>
      <div>
        <v-layout class="room" row justify-center wrapper>
          <v-flex xs10>
            <v-container grid-list-x1 test-xs-center>
              <v-layout row wrapper>
                <v-flex xs1>
                  <p class="orange--text time">
                    {{(new Date(this.room.start)).toTimeString().substr(0,5)}}
                  </p>
                </v-flex>
                <v-flex offset-xs1 xs5>
                    <span class="black--text text--primary title">{{this.room.caption}}</span>
                    <br>
                    <span class="description height-half text--secondary">
                      {{this.room.description}}
                    </span>
                </v-flex>
                <v-flex offset-xs1 xs4>
                  <ul class="members-list">
                    <li style="font-size: 26px;">Osoby ({{this.members.length}}<span ng-if="this.room.limit != 0">/{{this.room.limit}}</span>)</li>
                    <li v-for="member in this.members">
                        {{member.username}}
                    </li>
                  </ul>
                </v-flex>
              </v-layout>

              <v-layout class="organizing-data" row wrapper>
                <v-flex xs1>
                  {{(new Date(this.room.end)).toTimeString().substr(0,5)}}
                </v-flex>
                <v-flex xs4>
                  <span v-if="this.room.building">
                    {{this.room.building}},
                  </span>
                  <span v-if="this.room.roomName">
                    {{this.room.roomName}}
                  </span>
                </v-flex>
              </v-layout>

              <v-layout class="room-controls" row wrapper>
                <v-flex xs2>

                </v-flex>
                <v-flex offset-xs6 xs4>
                  <v-btn
                    @click.stop="joinRoom(event.pk)"
                    block color="primary" round>
                    Dołącz
                  </v-btn>
                </v-flex>
              </v-layout>

            </v-container>
          </v-flex>
        </v-layout>
        <div class="left-aligned">
          <span @click="$router.go(-1)" class="back-btn">
            <v-icon large>keyboard_arrow_left</v-icon>
            Back
          </span>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
  import { API_URL } from '../../constants';

  export default {
    name: 'Room',
    data() {
      return {
        roomId: this.$route.params.roomId,
        room: {},
        members: []
      };
    },
    mounted() {
      this.$http.get(API_URL + 'rooms/' + this.roomId)
        .then(response => {
          this.room = response.body;

          // TODO: Filter in backend!
          return this.$http.get(API_URL + 'users/');
        })
        .catch(err => console.log(err))
        .then(usersResponse => {

          let users = usersResponse.body;
          this.members = users.filter(user => this.room.members.indexOf(user.pk) !== -1)
        })
    },
    methods: {
      joinRoom() {
        console.log('Joining room');
      }
    }
  };
</script>

<style scoped>
  .title {
    font-weight: 600;
    font-size: 36px;
    margin-bottom: 30px !important;
    padding-bottom: 30px !impo;
  }

  .room-container {
    background-color: #ffffff;
    width: 100%;
    height: 100%;
  }

  .room {
    height: 100%;
    box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.05), 0 0 20px 0 rgba(0, 0, 0, 0.05);
  }

  .back-btn {
    margin-top: 8px;
    font-size: 24px;
    color: #7b7b7b;
    cursor: pointer;
  }

  .left-aligned {
    text-align: left;
  }

  .room-controls {
    /*background-color: #e6e6e6;*/
    /*margin-bottom: 0;*/
    /*margin-left: 0;*/
    /*margin-right: 0;*/
    /*padding-bottom: 0;*/
    /*padding-left: 0;*/
    /*padding-right: 0;*/
  }

  .members-list {
    list-style: none;
  }

  .organizing-data {
    padding-top: 40px;
  }
</style>
