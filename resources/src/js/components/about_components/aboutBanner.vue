<template>
    <div>
            <div>
                <ul v-if="showAbout" class="tabs cf type--center tab__link--kerning">
                    <li class="tab__list">
                        <a data-interactable class="tab__link--active" @click="selectAbout">About</a>
                    </li>
                    <li class="tab__list">
                        <a data-interactable class="tab__link tab__link--hover" @click="selectVersion">Version History</a>
                    </li>
                </ul>
                <ul v-if="showAbout === false" class="tabs cf type--center tab__link--kerning">
                    <li class="tab__list">
                        <a data-interactable class="tab__link tab__link--hover" @click="selectAbout">About</a>
                    </li>
                    <li class="tab__list">
                        <a data-interactable class="tab__link--active" @click="selectVersion">Version History</a>
                    </li>
                </ul>
            </div>
        <div class="panel about">
            <div v-if="showAbout">
                <about-page></about-page>
            </div>
            <div v-else>
                <version-history></version-history>
            </div>
        </div>
    </div>
</template>

<script>
    import AboutPage from './aboutPage';
    import VersionHistory from './versionHistoryPage';

    export default {
      components: {
        VersionHistory,
        AboutPage,
  },
      name: 'about-banner',
      data() {
    return {
          showAbout: true,
    };
  },


      methods: {
        selectAbout() {
          this.showAbout = true;
    },
        selectVersion() {
          this.showAbout = false;
    },
      },

    };
</script>