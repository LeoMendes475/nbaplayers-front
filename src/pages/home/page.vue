<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../../services/index";
import axios from "axios";

import PlayerTable from "./components/PlayerTable.vue";
import EditPlayerModal from "./components/EditPlayerModal.vue";
import ConfirmModal from "../../components/ConfirmModal.vue";

import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import PrimeToast from "primevue/toast";
import { useToast } from "primevue/usetoast";

const players = ref([]);
const page = ref(1);
const rows = ref(10);

const visibleEditModal = ref(false);
const confirmModalVisible = ref(false);
const toast = useToast();

const selectedPlayer = ref({
	first_name: "",
	last_name: "",
	team: "",
	position: "",
	jersey_number: "",
	height: "",
	country: "",
});

let nextCursor = ref(null);

async function getAllPlayers() {
	let allPlayers = [];

	try {
		const response = await api.get("/players/findAll");

		rows.value = response.meta?.per_page;

		allPlayers = response.data;
		players.value = allPlayers;

		nextCursor.value = response.meta?.next_cursor;
	} catch (error) {
		console.error("Erro ao buscar jogadores:", error);
	}
}

onMounted(() => {
	getAllPlayers();
});

function openEditPlayer(player) {
	selectedPlayer.value = player;
	visibleEditModal.value = true;
}

function OpenConfirmDeleteModal(id: string) {
	selectedPlayer.value = id;
	confirmModalVisible.value = true;
}

async function savePlayer() {
	await api
		.put(`/players/${selectedPlayer.value.id}`, {
			...selectedPlayer.value,
			team: selectedPlayer.value.team.name,
		})
		.then(() => {
			getAllPlayers();
			toast.add({
				severity: "success",
				summary: "Success",
				detail: "Player edited successfully",
				life: 3000,
			});
		})
		.catch((error) => {
			console.error("Error editing player:", error);

			toast.add({
				severity: "error",
				summary: "Error",
				detail: "Error editing player",
				life: 3000,
			});
		});

	visibleEditModal.value = false;
}

async function deletePlayer() {
	await api
		.delete(`/players/${selectedPlayer.value}`)
		.then(() => {
			getAllPlayers();
			toast.add({
				severity: "success",
				summary: "Success",
				detail: "player deleted successfully",
				life: 3000,
			});
		})
		.catch((error) => {
			console.error("error deleting player:", error);

			toast.add({
				severity: "error",
				summary: "Error",
				detail: "error deleting player",
				life: 3000,
			});
		});

	confirmModalVisible.value = false;
}
</script>

<template>
	<div class="flex flex-col">
		<div class="!py-4 !px-8">
			<h1 class="text-3xl">NBA Players</h1>
		</div>

		<div class="card !px-8 !py-4 !mb-8">
			<PlayerTable
				:players="players"
				@edit="openEditPlayer"
				@delete="OpenConfirmDeleteModal"
			/>
		</div>

		<EditPlayerModal
			:player="selectedPlayer"
			:visible="visibleEditModal"
			@update:visible="visibleEditModal = $event"
			@update:player="selectedPlayer = $event"
			@save="savePlayer()"
		/>

		<ConfirmModal
			:visible="confirmModalVisible"
			title="Delete Player"
			message="Are you sure you want to delete this player?"
			confirmLabel="Delete"
			cancelLabel="Cancel"
			confirmSeverity="danger"
			@update:visible="confirmModalVisible = $event"
			@confirm="deletePlayer()"
		/>

		<PrimeToast />
	</div>
</template>
