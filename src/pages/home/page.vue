<script setup lang="ts">
import { ref, onMounted } from "vue";
import { BalldontlieAPI } from "@balldontlie/sdk";

import PlayerTable from "./components/PlayerTable.vue";
import EditPlayerModal from "./components/EditPlayerModal.vue";

import { FilterMatchMode, FilterOperator } from "@primevue/core/api";

const api = new BalldontlieAPI({
	apiKey: "19f8c436-d540-43ee-8470-c95ef6ecc2ec",
});

const players = ref([]);
const page = ref(1);
const rows = ref(10);

const visibleDialog = ref(false);
const selectedPlayer = ref({
	first_name: "",
	last_name: "",
	team: {},
	position: "",
	jersey_number: "",
	height: "",
	country: "",
});

let nextCursor = ref(null);

async function getAllPlayers() {
	let allPlayers = [];

	try {
		const response = await api.nba.getPlayers({
			per_page: 100,
		});

		rows.value = response.meta?.per_page;

		allPlayers = response.data;
		players.value = allPlayers;

		nextCursor.value = response.meta?.next_cursor;
	} catch (error) {
		console.error("Erro ao buscar jogadores:", error);
	}
}

const focusedPlayer = ref();
const filters = ref({
	global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	name: {
		operator: FilterOperator.AND,
		constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
	},
	"country.name": {
		operator: FilterOperator.AND,
		constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
	},
	representative: { value: null, matchMode: FilterMatchMode.IN },
	status: {
		operator: FilterOperator.OR,
		constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
	},
});

onMounted(() => {
	getAllPlayers();
});

function openEditPlayer(player) {
	selectedPlayer.value = player;
	visibleDialog.value = true;
}
</script>

<template>
	<div class="flex flex-col">
		<div class="py-4 px-8">
			<h1 class="text-3xl">NBA Players</h1>
		</div>

		<div class="card">
			<PlayerTable :players="players" @edit="openEditPlayer" />

			<EditPlayerModal
				:player="selectedPlayer"
				:visible="visibleDialog"
				@update:visible="visibleDialog = $event"
				@update:player="selectedPlayer = $event"
				@save="savePlayer"
			/>
		</div>
	</div>
</template>
