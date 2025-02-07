<template>
	<div>
		<div class="base__header">
			<div class="toggle_sidebar__search">
				<div class="toggle_sidebar">
					<button class="sidemenu__btn" v-on:click="menu.isOpen=!menu.isOpen" v-bind:class="{active:menu.isOpen}">
						<span class="top"></span>
						<span class="mid"></span>
						<span class="bottom"></span>
					</button>
				</div>
				<div class="header_search font-medium px-2">
					{{ pageName }}
				</div>
			</div>
			<div class="user_info__options px-2">
				<!-- <div class="chooseToggleTheme" @click="darkMode = !darkMode">
					<label for="checkboxToggle" class="checkboxToggle-label">
						<i class="" :class="[darkMode ? 'bi-moon-fill' : ' bi-sun-fill', 'bi']" ></i>
						<span class="ball"></span>
					</label>
				</div> -->
				<!-- <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
					<img src="../../assets/images/en.webp" height="30px" class="rounded-circle" v-if="locale.code === 'en'" alt="">
					<img src="../../assets/images/ar.webp" height="30px" class="rounded-circle" v-if="locale.code === 'ar'" alt="">
				</NuxtLink> -->
				<b-dropdown size="xl" variant="link" toggle-class="text-decoration-none" no-caret v-if="show">
					<template #button-content>
						<b-avatar variant="primary" text="mn"></b-avatar>
					</template>
					<b-dropdown-item @click="actionLink('/dashboard/my-account/change-password')">
						<i class="bi bi-lock"></i>
						<span class="px-2">Change Password</span>
					</b-dropdown-item>
					<b-dropdown-divider/>
					<b-dropdown-item @click="logout()">
						<i class="bi-box-arrow-left"></i>
						<span class="px-2">Logout</span>
					</b-dropdown-item>
				</b-dropdown>
				
			</div>
			
		</div>
		<div class="backdrop_close_sidebar" @click="menu.isOpen=!menu.isOpen"></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				darkMode: false,
				menu: {
					isOpen: true
				},
				pageName: '',
				show: true,
				items: [
					{
						text: 'Admin',
						href: '#'
					},
					{
						text: 'Manage',
						href: '#'
					},
					{
						text: 'Library',
						active: true
					}
				]
			}
		},
		
		computed: {
			availableLocales () {
				return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
			}
		},
		mounted(){
			if(this.$auth) {
				this.show = true
			}
			let checkSideBarMediaQuery = window.matchMedia("(max-width: 700px)")
			if (checkSideBarMediaQuery.matches) {
				this.menu.isOpen = false
			}else {
				this.menu.isOpen = true
			}
		},
		methods: {
			actionLink(path) {
				this.$router.push(this.localePath({ path: path }))
			},
			async logout() {
				await this.logoutGlobal()
			},
			async pageNameFun(e) {

				this.loader = true
				this.pageRoute = e.path.split("/");
				const pageRouteF = this.pageRoute.filter(e =>  e);
				const lower = pageRouteF.map(element => {
					return element.toLowerCase();
				});
				
				if(this.$route.params.id != null) {
					this.finalPage =  "pages." + lower.at(-2) + ".pageName";
				}
				else {
					if(this.pageRoute.length >= 3) {
						this.finalPage =  "pages." + lower.at(-1) + ".pageName";
					}
				}
				this.pageName =  this.$t(this.finalPage)
				this.loader = false
				this.$nextTick(() => {
					this.$nuxt.$loading.start()
					setTimeout(() => this.$nuxt.$loading.finish(), 1500)
				})
			},
		},
		watch: {

			'menu.isOpen': function () {
				let sidebar = document.getElementsByClassName('grid__nav')[0]
				let backDropSidebar = document.getElementsByClassName('backdrop_close_sidebar')[0]

				
				if(this.menu.isOpen == false) {
					backDropSidebar.classList.add('hidden')
					sidebar.classList.remove("toggled");
				}else {
					backDropSidebar.classList.remove('hidden')
					sidebar.classList.add("toggled");
				}
			},

			$route: {
				handler: function (e) {
					this.pageNameFun(e)
				},
			
				deep: true,
				immediate: true,
			},
			darkMode: function () {
				const htmlElement = document.documentElement
				let darkModeStatus = this.darkMode
				if (darkModeStatus) {
					localStorage.setItem('theme', 'dark')
					htmlElement.setAttribute('theme', 'dark')
				} else {
					localStorage.setItem('theme', 'light')
					htmlElement.setAttribute('theme', 'light')
				}
			},
		},
	}
</script>
