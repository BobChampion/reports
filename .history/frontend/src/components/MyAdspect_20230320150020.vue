<template>
  <div class="reports">
    <div class="repotsInner">
      <div class="tableBlock">
        <table>
          <thead class="tableTitles">
            <tr>
              <th>Name</th>
              <th>Account Id</th>
              <th>Stream Id</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stream in filterStreams" :key="stream.stream_id">
              <td>{{ stream.name }}</td>
              <td>{{ stream.account_id }}</td>
              <td>{{ stream.stream_id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="tableBlock">
        <table>
          <thead class="tableTitles">
            <tr>
              <th>Name</th>
              <th>Account Id</th>
              <th>Stream Id</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stream in streams" :key="stream.stream_id">
              <td>{{ stream.name }}</td>
              <td>{{ stream.account_id }}</td>
              <td>{{ stream.stream_id }}</td>
            </tr>
          </tbody>
        </table>
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyAdspect',
  data() {
    return {
      streams: [],
    };
  },
  mounted() {
    axios
      .get('/api/streams')
      .then((response) => {
        this.streams = response.data;
        console.log(this.streams);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  computed: {
    filterStreams() {
      return this.streams.filter(
        (stream) =>
          stream.money_pages[0].page === 'https://black.com' ||
          stream.safe_pages[0].page === 'https://white.com',
      );
    },
  },
};
</script>

<style>
/* report */
.reports {
  height: 100%;
}
.repotsInner {
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  padding: 50px 0;
  height: 100%;
}
.tableBlock {
  width: 100%;
  max-height: 50%;
  overflow-y: scroll;
  border: 1px solid #000;
}

/* table */
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  font-family: 'Roboto';
  height: 100%;
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
