<template>

  <v-flex xs12 sm5 md3 my-3 mx-2 class="event-card">
    <v-card px-2 class="max-height" height="100%">

      <v-card-title class="px-0 height-half" primary-title>
        <v-flex xs4>

          <p class="orange--text time">
          {{(new Date(this.event.start)).toTimeString().substr(0,5)}}
        </p>
        </v-flex>

        <v-flex xs8>
          <div class="card-header rounded">
            <div class="no-margin">
              <span class="black--text">{{this.event.caption}}</span>
              <br>
              <span class="height-half secondaryText--text"
                    v-if="this.event.description">{{this.event.description}}</span>
            </div>
          </div>
        </v-flex>
      </v-card-title>
      <v-card-text class="px-0 no-margin" style="background-color:#f9f9f9;">
        <v-layout wrap fluid style="">
          <v-flex xs8>
            <v-layout>
              <v-flex>
                <span class="primary--text distance">
                  {{
                  distanceInKmBetweenEarthCoordinates(this.event.lat,this.event.lon,50,20)
                  }} KM
                </span>
              </v-flex>
              <v-flex>
            <span>
            <v-icon>group</v-icon>
            {{this.event.members.length}}<span v-if="this.event.limit">/{{this.event.limit}}</span> osób
          </span>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex mx-2>
            <v-btn
              @click.stop="joinRoom(event.pk)"
              block color="primary" round>
              {{joinText}}
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
  import { API_URL } from '../../constants';

  export default {
    name: 'EventListItem',
    computed: {
      joined() {
        const userPk = window.localStorage.getItem('userPk');
        return this.room.members.indexOf(userPk) !== -1;
      },
      room() {
        return this.$store.data.rooms.filter(room => room.pk === this.event.pk)[0]
      },
      joinText() {
        if (this.joined)
          return 'Wyjdź';
        else
          return 'Dołącz';
      }
    },
    props: ['event'],
    methods: {
      joinRoom(roomId) {
        let room = this.room;
        let userPk = window.localStorage.getItem('userPk');

        // THIS SHOULD BE DONE ON BACKEND! + It doesn't work for deleting users from room and empty rooms. xD

        if (this.joined) {
          const userIndex = room.members.indexOf(userPk);
          if (userIndex > -1) {
            room.members.splice(userIndex, 1);
          }
        } else
          room.members = room.members.concat(userPk);
        this.$http.put(API_URL + 'rooms/' + room.pk, room)
          .then(response => console.log(response))
          .catch(err => console.log(err));
      },
      distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
        var earthRadiusKm = 6371;
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        if (parseInt(earthRadiusKm * c) < 1) return "<1"
        return parseInt(earthRadiusKm * c);
      }
    },
  }

</script>
subject: test.subject,
subjectDesc: test.subjectDesc,
distance: test.distance,
currentUsers: test.currentUsers,

<style scoped>
  .event-card {
    cursor: pointer;
    word-wrap: normal;
  }

  .event-card:hover {
    background-color: #e6e6e6;
  }

  .max-height {
    height: 100%
  }

  .height-half {
    height: 50%
  }

  .distance {
    font-weight: bold;
  }

  .no-margin {
    margin: 0 auto;
  }

  .time {
    align-self: left;
    border-radius: 20px;
    padding: 10px;
    font-size: large;
    font-weight: bold;
  }

  .rounded {
    border-radius: 20px;
  }
</style>
