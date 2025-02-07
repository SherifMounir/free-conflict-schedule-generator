<template>
    <aside class="grid__nav toggled">
        <div class="sidebar_logo p-4">
            <!-- <img src="../../assets/images/logo.png" class="img-fluid" width="170" alt=""> -->
           <span>REGISTRATION</span>
        </div>
        <div class="menu_list">
            <ul class="sidebar_list list-unstyled" v-if="menu.length">
                <li class="sidebar_list__item" v-for="(itemLink, index) in menu">
                    <NuxtLink class="sidebar_list__item_link tooltip-custom" :to="localePath(itemLink.path)" v-if="itemLink.children.length == 0 && itemLink.key != 'logout'">
                        <div class="sidebar_list__item_link__icon-name">
                            <div class="icon-s " :id="itemLink.name+'_'+index">
                                <i :class="itemLink.icon"></i>
                            </div>
                            <span class="sidebar_page_name">{{ itemLink.name }}</span>
                            <span class="tooltiptext">{{ itemLink.name }}</span>
                        </div>
                    </NuxtLink>
                    <template v-if="itemLink.children.length != 0 && itemLink.key != 'logout'">

                            <div class="position-relative">
                                <NuxtLink class="sidebar_list__item_link tooltip-custom" :to="localePath(itemLink.path)">
                                    <div class="sidebar_list__item_link__icon-name">
                                            <div class="icon-s ">
                                                <i :class="itemLink.icon"></i>
                                            </div>
                                            <span class="sidebar_page_name">{{ itemLink.name }}</span>
                                            <span class="tooltiptext">{{ itemLink.name }}</span>

                                    </div>
                                </NuxtLink>
                                <div class="sidebar_list__item_link__arrow inline-flex" :class="[itemLink.isOpen ? 'active' : '']" @click="toggleMenu(index)">
                                    <i :class="[itemLink.isOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down', 'bi']"></i>
                                </div>
                                <div class="listtrans" :class="[itemLink.isOpen ? 'sidebar_list_child_is-open' : 'sidebar_list_child_is-close']">
                                    <ul class="sidebar_list_child list-unstyled">
                                        <li v-for="(itemLinkChild, indexChild) of itemLink.children" :key="indexChild" class="sidebar_list_child__item">
                                            <NuxtLink class="sidebar_list_child__item_link" :to="itemLinkChild.path">
                                                <!-- <div class="icon-s-child" v-if="itemLinkChild.children">
                                                    <i :class="itemLink.icon"></i>
                                                </div> -->
                                                {{ itemLinkChild.name }}
                                                <!-- <span :class="{'sidebar_page_name_child sidebar_page_name': itemLinkChild.children}">{{ itemLinkChild.name }}</span> -->
                                            </NuxtLink>
                                            <div class="sidebar_list__item_link__arrow inline-flex" v-if="itemLinkChild.children" :class="[itemLinkChild.isOpen ? 'active' : '']" @click="itemLinkChild.isOpen = !itemLinkChild.isOpen">
                                                <i :class="[itemLinkChild.isOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down', 'bi']"></i>
                                            </div>
                                            <div class="listtrans" :class="[itemLinkChild.isOpen ? 'sidebar_list_child_is-open' : 'sidebar_list_child_is-close']">
                                                <ul class="sidebar_list_child list-unstyled">
                                                    <li class="sidebar_list_child__item testabc" v-for="subItemLinkChild of itemLinkChild.children" style="margin-left: -20px;">
                                                        <NuxtLink class="sidebar_list_child__item_link sub-menu-child" :to="subItemLinkChild.path">
                                                            {{ subItemLinkChild.name }}
                                                        </NuxtLink>

                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                    </template>
                    <div v-if="itemLink.key == 'logout'">
                        <div class="sidebar_list__item_link tooltip-custom" @click="logout()">
                            <div class="sidebar_list__item_link__icon-name">
                                <div class="icon-s">
                                    <i :class="itemLink.icon"></i>
                                </div>
                                <span class="sidebar_page_name">{{ itemLink.name }}</span>
                            </div>
                            <span class="tooltiptext">{{ itemLink.name }}</span>

                        </div>
                    </div>
                </li>
            </ul>
            <div class="loader-page default-color" v-else>
                <b-spinner class="align-middle"></b-spinner>
            </div>
        </div>
    </aside>
</template>
<script>
    import { mapActions } from "vuex";
    export default {
        data() {
            return {
                menu: [
                    {
                        id: 1,
                        name: "Home",
                        path: "/dashboard/home",
                        icon: "bi bi-house",
                        isOpen: false,
                        children: []
                    },
                    {
                        id: 2,
                        name: "Profile",
                        path: "/dashboard/profile",
                        icon: "bi bi-house",
                        isOpen: false,
                        children: []
                    },
                    {
                        id: 3,
                        name: "Courses",
                        path: "/dashboard/courses",
                        icon: "bi bi-house",
                        isOpen: false,
                        children: []
                    },
                    {
                        id: 4,
                        name: "Schedule",
                        path: "/dashboard/schedule",
                        icon: "bi bi-calendar-check",
                        isOpen: false,
                        children: [
                            {
                                name: "build schedule",
                                path: "/dashboard/schedule/build-schedule"
                            },
                            {
                                name: "my schedule",
                                path: "/dashboard/schedule/my-schedule"
                            }
                        ]
                    },
                    {
                        id: 5,
                        name: "Faq",
                        path: "/dashboard/faq",
                        icon: "bi bi-house",
                        isOpen: false,
                        children: []
                    },
                    {
                        name: "Sign Out",
                        key: "logout",
                        icon: "bi bi-box-arrow-left",
                        children: []
                    }
                ]
            }
        },
        created() {
            // this.handleSidebar()
        },
        methods: {
            ...mapActions({
                GET_SIDEBAR: "dashboard/ui/GET_SIDEBAR",
            }),
            handleSidebar() {

                let newMenu = []
                this.GET_SIDEBAR().then((res)=> {
                    for(let itemMenu of res.content) {
                        newMenu.push({
                            id: itemMenu.id,
                            name: itemMenu.link_name,
                            path: itemMenu.link_url,
                            icon: itemMenu.icon,
                            isOpen: false,
                            children: []
                        })
                        for(let itemChild of itemMenu.sub_navs) {
                            for(let finalNewMenu of newMenu) {
                                if(itemChild.parent_id == finalNewMenu.id) {
                                    finalNewMenu.children.push({
                                        name: itemChild.link_name,
                                        path: itemChild.link_url
                                    })
                                }
                            }
                        }
                    }
                    newMenu.push({
                        name: 'Sign Out',
                        key: 'logout',
                        icon: 'bi bi-box-arrow-left',
                        children: []
                    })
                    console.log(newMenu)

                })
            },
            closeOthersDropwdowns(exceptThatIndex) {
                this.menu = this.menu.map((ele, index) => {
                    if (index != exceptThatIndex) {
                        ele.isOpen = false;
                    }
                    return ele;
                });
            },

            toggleMenu(index) {
                this.closeOthersDropwdowns(index);
                if (this.menu[index]?.children) {
                    this.menu[index].isOpen = !this.menu[index]?.isOpen;
                }
            },

            async logout() {
                await this.confirmAlert('Are you sure you want to sign out?', ``, 'warning').then(({dismiss})=> {
                    if (!dismiss) {
                       this.$router.push(this.localePath({ path: "/"}))
                    }
                })
			}
        }
    }
</script>
