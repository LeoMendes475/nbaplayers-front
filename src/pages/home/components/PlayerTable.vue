<template>
	<div class="card">
		<PrimeDataTable
			v-model:filters="filters"
			v-model:selection="focusedPlayer"
			:value="players"
			stateStorage="session"
			stateKey="dt-state-demo-session"
			paginator
			:rows="8"
			filterDisplay="menu"
			selectionMode="single"
			dataKey="id"
			:globalFilterFields="[
				'name',
				'country.name',
				'representative.name',
				'status',
			]"
			tableStyle="min-width: 50rem"
		>
			<template #header>
				<PrimeIconField>
					<PrimeInputIcon>
						<i class="pi pi-search" />
					</PrimeInputIcon>
					<PrimeInputText
						v-model="filters['global'].value"
						placeholder="Global Search"
					/>
				</PrimeIconField>
			</template>

			<PrimeColumn field="name" header="Name" sortable style="width: 20%">
				<template #body="{ data }">
					<div class="flex items-center gap-2">
						<span>{{ data.first_name }} {{ data.last_name }}</span>
					</div>
				</template>
			</PrimeColumn>

			<PrimeColumn
				header="Team"
				sortable
				sortField="team"
				filterField="team"
				filterMatchMode="contains"
				style="width: 10%"
			>
				<template #body="{ data }">
					<div class="flex items-center gap-2">
						<span>{{ data.team.name }}</span>
					</div>
				</template>
			</PrimeColumn>

			<PrimeColumn
				header="Jersey Number"
				sortable
				sortField="jersey_number"
				filterField="jersey_number"
				filterMatchMode="contains"
				style="width: 5%"
			>
				<template #body="{ data }">
					<div class="flex items-center gap-2">
						<span>{{ data.jersey_number }}</span>
					</div>
				</template>
			</PrimeColumn>

			<PrimeColumn
				header="Position"
				sortable
				sortField="position"
				filterField="position"
				filterMatchMode="contains"
				style="width: 5%"
			>
				<template #body="{ data }">
					<div class="flex items-center gap-2">
						<span>{{ data.position }}</span>
					</div>
				</template>
			</PrimeColumn>

			<PrimeColumn
				header="Height"
				sortable
				sortField="height"
				filterField="height"
				filterMatchMode="contains"
				style="width: 5%"
			>
				<template #body="{ data }">
					<div class="flex items-center gap-2">
						<span>{{ data.height }}</span>
					</div>
				</template>
			</PrimeColumn>

			<PrimeColumn
				header="Country"
				sortable
				sortField="country"
				filterField="country"
				filterMatchMode="contains"
				style="width: 10%"
			>
				<template #body="{ data }">
					<div class="flex items-center gap-2">
						<span>{{ data.country }}</span>
					</div>
				</template>
			</PrimeColumn>

			<PrimeColumn header="Edit" sortable style="width: 5%">
				<template #body="{ data }">
					<PrimeButton label="Edit" @click="editPlayer(data)" />
				</template>
			</PrimeColumn>

			<PrimeColumn header="Delete" sortable style="width: 5%">
				<template #body="{ data }">
					<PrimeButton label="Delete" @click="deletePlayer(data?.id)" />
				</template>
			</PrimeColumn>

			<template #empty> No players found. </template>
		</PrimeDataTable>
	</div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { BalldontlieAPI } from "@balldontlie/sdk";
import PrimeDataTable from "primevue/datatable";
import PrimeInputText from "primevue/inputtext";
import PrimeIconField from "primevue/iconfield";
import PrimeInputIcon from "primevue/inputicon";
import PrimeColumn from "primevue/column";
import PrimeButton from "primevue/button";
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";

const props = defineProps({
	players: {
		type: Array,
		default: () => [],
	},
});

const api = new BalldontlieAPI({
	apiKey: "19f8c436-d540-43ee-8470-c95ef6ecc2ec",
});

const visibleEditModal = ref(false);
const selectedPlayer = ref({
	first_name: "",
	last_name: "",
	team: {},
	position: "",
	jersey_number: "",
	height: "",
	country: "",
});

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

function openPlayerDialog(player) {
	selectedPlayer.value = player;
	visibleEditModal.value = true;
}

const emit = defineEmits(["edit", "delete"]);

function editPlayer(player) {
	emit("edit", player);
}

function deletePlayer(id: string) {
	emit("delete", id);
}
</script>
