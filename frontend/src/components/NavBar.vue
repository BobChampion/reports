<template>
  <div class="navBar">
    <router-link to="/" class="navbar-logo">
      <p @click="setActiveLink('')"><img src="../assets/img/logo.png" alt="" /></p>
    </router-link>
    <div class="navBarInner">
      <div class="navbar-item" v-on:mouseover="mouseover" v-on:mouseleave="mouseleave">
        <a :class="['navbar-link', { active: isOpen }, { activeLink: activeLink === 'Adspect' }]">
          Adspect
        </a>

        <div class="navbar-dropdown" v-show="isOpen">
          <router-link to="/adspect/streams" class="navbar-item-link"
            ><span @click="setActiveLink('Adspect')">Streams</span>
          </router-link>
          <router-link to="/adspect/streamswithclick" class="navbar-item-link">
            <span @click="setActiveLink('Adspect')">Streams With Click</span>
          </router-link>
        </div>
      </div>
      <div class="navbar-item" v-on:mouseover="mouseover1" v-on:mouseleave="mouseleave1">
        <a :class="['navbar-link', { active: isOpen1 }, { activeLink: activeLink === 'Voluumn' }]">
          Voluumn
        </a>

        <div class="navbar-dropdown" v-show="isOpen1">
          <router-link to="/voluumn/validator" class="navbar-item-link"
            ><span @click="setActiveLink('Voluumn')">Validator</span></router-link
          >
          <router-link to="/voluumn/voluumnerror" class="navbar-item-link">
            <span @click="setActiveLink('Voluumn')">Voluumn Error</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isOpen1: false,
      activeLink: '',
    };
  },
  mounted() {
    if (this.$router.currentRoute.path.includes('/adspect')) {
      this.activeLink = 'Adspect';
    } else if (this.$router.currentRoute.path.includes('/voluumn')) {
      this.activeLink = 'Voluumn';
    }
  },
  methods: {
    mouseover() {
      this.isOpen = true;
    },
    mouseover1() {
      this.isOpen1 = true;
    },
    mouseleave() {
      this.isOpen = false;
    },
    mouseleave1() {
      this.isOpen1 = false;
    },
    setActiveLink(link) {
      this.activeLink = link;
    },
  },
};
</script>

<style>
/* Navbar container */
.navBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 12vh;
  padding: 20px 20px;
  padding-bottom: 0;
  background-color: #5161ce;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.navBarInner {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  width: 25%;
}

/* Navbar logo */
.navbar-logo img {
  height: 80px;
  width: auto;
}

/* Navbar links */
.navbar-link {
  display: block;
  font-family: 'Roboto';
  font-size: 20px;
  padding: 25px 0;
  text-align: center;
  color: #fff;
  text-decoration: none;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s;
}
.navbar-link.active {
  background-color: #fff;
  color: #5161ce;
}
.navbar-link:hover {
  background-color: #fff;
}
.navbar-link.activeLink {
  background-color: #fff;
  color: #5161ce;
}

/* Navbar items */
.navbar-item {
  width: 42%;
  position: relative;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
}
.navbar-item-link {
  font-family: 'Roboto';
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  padding: 10px;
  color: #5161ce;
  background: #fff;
  transition: all 0.3s;
}
.navbar-item-link span {
  display: inline-block;
  width: 100%;
}
.navbar-item-link:hover {
  background: #5161ce;
  color: #fff;
}
.navbar-item-link.router-link-active {
  background: #5161ce;
  color: #fff;
}

/* Navbar dropdown */
.navbar-dropdown {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 69px;
  left: 0;
  z-index: 1;
  margin-top: 5px;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}
</style>
