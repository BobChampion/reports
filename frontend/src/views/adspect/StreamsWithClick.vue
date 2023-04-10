<template>
  <div class="streamsWithClick">
    <div class="container">
      <h2 class="tableBlockTitle">Streams With Click</h2>
      <Skeleton v-if="!haveData" :count="10" height="30px" />
      <table v-else v-show="!lengthZero">
        <thead class="tableTitles">
          <tr>
            <th>Name</th>
            <th>Click Count</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stream in streamswithclick" :key="stream.stream_id">
            <td>{{ stream.name }}</td>
            <td>{{ stream.clickCount }}</td>
            <td>{{ stream.createdDate }}</td>
          </tr>
        </tbody>
      </table>
      <p v-show="lengthZero">No Streams which clicks less then 30</p>
    </div>
  </div>
</template>

<script>
import axios from '../../helpers/baseUrl';
import { Skeleton } from 'vue-loading-skeleton';

export default {
  name: 'MyAdspect',
  components: {
    Skeleton,
  },
  data() {
    return {
      streams: [],
      streamswithclick: [],
      haveData: false,
      lengthZero: false,
    };
  },
  async mounted() {
    await axios
      .get('/api/streamswithclick')
      .then((response) => {
        if (response) {
          this.haveData = true;
          if (response.data.length === 0) {
            this.lengthZero = true;
          }
        }
        this.streamswithclick = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style>
/* table */
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  font-family: 'Roboto';
  height: 100%;
  border: 1px solid #dee2e6;
}

table th,
table td {
  border: 1px solid #dee2e6;
  padding: 0.75rem;
  text-align: left;
}

table th {
  background-color: #f2f2f2;
  font-weight: 600;
}

table tbody tr:hover {
  background-color: #f5f5f5;
}

table td:first-child,
table th:first-child {
  border-left: none;
}

table td:last-child,
table th:last-child {
  border-right: none;
}
</style>
