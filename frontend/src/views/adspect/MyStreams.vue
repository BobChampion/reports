<template>
  <div class="mystreams">
    <div class="container">
      <div class="myStreamsInner">
        <h2 class="tableBlockTitle">
          Streams <span>{{ cherryStreams.length }}</span>
        </h2>
        <Skeleton v-if="!isGetStreamsData" :count="10" height="30px" />
        <div v-else class="tableBlock">
          <div class="tableBlockTop">
            <table>
              <thead class="tableTitles">
                <tr>
                  <th>Name</th>
                  <th>Account Id</th>
                  <th>Stream Id</th>
                  <td>Delete</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="stream in visibleStreams" :key="stream.stream_id">
                  <td>{{ stream.name }}</td>
                  <td>{{ stream.account_id }}</td>
                  <td>{{ stream.stream_id }}</td>
                  <td class="streamDeleteBtn" @click="deleteStream(stream.stream_id)">Delete</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="pagination">
            <button :disabled="currentPage === 1" @click="prevPage">Prev</button>
            <span
              v-for="page in pages"
              :key="page"
              :class="{ active: page === currentPage }"
              @click="setCurrentPage(page)"
              >{{ page }}</span
            >
            <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
          </div>
          <p v-if="totalStreams === 0">No streams found.</p>
          <p v-else>
            Showing streams {{ (currentPage - 1) * perPage + 1 }} to
            {{ Math.min(currentPage * perPage, totalStreams) }} of {{ totalStreams }}.
          </p>
        </div>
      </div>
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
      cherryStreams: [],
      isGetStreamsData: false,
      perPage: 25,
      currentPage: 1,
      totalPages: 0,
    };
  },
  async mounted() {
    await axios
      .get('/api/cherrystreams')
      .then((response) => {
        if (response.data.length > 0) {
          this.isGetStreamsData = true;
        }
        this.cherryStreams = response.data;
        console.log(this.cherryStreams);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    async deleteStream(streamId) {
      try {
        await axios.delete(`https://api.adspect.net/v1/streams/${streamId}`);
        this.cherryStreams = this.cherryStreams.filter((stream) => stream.stream_id !== streamId);
      } catch (error) {
        console.error(error);
      }
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
  computed: {
    totalStreams() {
      return this.cherryStreams.length;
    },
    pages() {
      return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    },
    visibleStreams() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.cherryStreams.slice(start, end);
    },
    // filterStreams() {
    //   return this.streams.filter(
    //     (stream) =>
    //       stream.money_pages[0].page === 'https://black.com' ||
    //       stream.safe_pages[0].page === 'https://white.com',
    //   );
    // },
    // filterStreamsWithNoLink() {
    //   return this.streams.filter(
    //     (stream) =>
    //       stream.url_rules.length === 0 &&
    //       stream.money_pages[0].page !== 'https://black.com' &&
    //       stream.safe_pages[0].page !== 'https://white.com',
    //   );
    // },
  },
  watch: {
    totalStreams() {
      this.totalPages = Math.ceil(this.totalStreams / this.perPage);
    },
  },
};
</script>

<style>
.mystreams {
  height: 100%;
}
.container {
  padding: 20px;
  height: 100%;
}
.tableBlockTop {
  max-height: 500px;
  overflow-y: scroll;
}
.tableBlockTitle {
  font-family: 'Roboto';
  margin-bottom: 20px;
}

/* table */
table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  font-family: 'Roboto';
  border: 1px solid #dee2e6;
  height: 500px;
  overflow-y: scroll;
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

/* stream */
.streamDeleteBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: red;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
  height: 100%;
  width: 100%;
}
.streamDeleteBtn:hover {
  background: #fff;
  color: red;
}

/* pagination */
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.pagination button,
.pagination span {
  padding: 6px 12px;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  background-color: #f5f5f5;
  color: #333;
  cursor: pointer;
}

.pagination button:disabled,
.pagination span.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span.active {
  background-color: #337ab7;
  color: #fff;
}

/* "No streams found" / "Showing streams" paragraphs */
.mystreams p {
  margin: 10px 0;
  font-family: 'Roboto';
  font-size: 16px;
}

.mystreams p:first-child {
  margin-top: 0;
}

.mystreams p:last-child {
  margin-bottom: 0;
}
</style>
