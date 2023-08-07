import {
	createWebHistory,
	createRouter,
	type RouteRecordRaw,
	type RouteLocationNormalized,
} from 'vue-router'
import Home from '@/pages/Home/index.vue'
import CardGame from '@/pages/CardGame/index.vue'
import { useUserStore } from '@/stores/user'
import { RouteName, RoutePath } from '@/router/enum'

const routes: RouteRecordRaw[] = [
	{
		path: RoutePath.Home,
		name: RouteName.Home,
		component: Home,
	},
	{
		path: RoutePath.CardGame,
		name: RouteName.CardGame,
		component: CardGame,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach(async (to: RouteLocationNormalized) => {
	const store = useUserStore()
	const isAuthenticated = store.user !== null

	if (!isAuthenticated && to.name !== RouteName.Home) {
		return { name: RouteName.Home }
	} else if (isAuthenticated && to.name === RouteName.Home) {
		return { name: RouteName.CardGame }
	}
})

export default router
