<script setup lang="ts">
import { ref, onMounted } from "vue";
import { BalldontlieAPI } from "@balldontlie/sdk";

import PrimeInputText from "primevue/inputtext";
import PrimeIconField from "primevue/iconfield";
import PrimeInputIcon from "primevue/inputicon";
import PrimeColumn from "primevue/column";
import PrimeDialog from "primevue/dialog";
import PrimeButton from "primevue/button";

import PlayerTable from "./components/PlayerTable.vue";

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

function openPlayerDialog(player) {
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
			<PlayerTable :players="players" />

			<PrimeDialog
				v-model:visible="visibleDialog"
				modal
				header="Edit Player"
				:style="{ width: '50vw' }"
				:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
				class="flex flex-col"
			>
				<!-- Organizando os campos em uma lista -->
				<ul class="flex flex-col gap-y-4">
					<li class="flex flex-col">
						<span>First name:</span>
						<PrimeInputText
							:modelValue="selectedPlayer?.first_name"
							@update:modelValue="(value: string) => (selectedPlayer.first_name = value)"
							placeholder="First Name"
						/>
					</li>

					<li class="flex flex-col">
						<span>Last name:</span>
						<PrimeInputText
							:modelValue="selectedPlayer?.last_name"
							@update:modelValue="(value: string) => (selectedPlayer.last_name = value)"
							placeholder="Last Name"
						/>
					</li>

					<li class="flex flex-col">
						<span>Team:</span>
						<PrimeInputText
							:modelValue="selectedPlayer?.team.name"
							@update:modelValue="(value: string) => (selectedPlayer.team.name = value)"
							placeholder="Team"
						/>
					</li>

					<li class="flex flex-col">
						<span>Position:</span>
						<PrimeInputText
							:modelValue="selectedPlayer?.position"
							@update:modelValue="(value: string) => (selectedPlayer.position = value)"
							placeholder="Position"
						/>
					</li>

					<li class="flex flex-col">
						<span>Jersey Number:</span>
						<PrimeInputText
							:modelValue="selectedPlayer?.jersey_number"
							@update:modelValue="(value: string) => (selectedPlayer.jersey_number = value)"
							placeholder="Jersey Number"
						/>
					</li>

					<li class="flex flex-col">
						<span>Height:</span>
						<PrimeInputText
							:modelValue="selectedPlayer?.height"
							@update:modelValue="(value: any) => (selectedPlayer.height = value)"
							placeholder="Height"
						/>
					</li>

					<li class="flex flex-col">
						<span>Country:</span>
						<PrimeInputText
							:modelValue="selectedPlayer?.country"
							@update:modelValue="(value: any) => (selectedPlayer.country = value)"
							placeholder="Country"
						/>
					</li>
				</ul>

				<div class="flex gap-x-4 !mt-4">
					<PrimeButton label="Save" />
					<PrimeButton label="Cancel" severity="secondary" />
				</div>
			</PrimeDialog>
		</div>
	</div>
</template>
