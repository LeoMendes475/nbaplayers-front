<!-- src/components/PlayerDialog.vue -->
<template>
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

			<!-- Outros campos como Team, Position, Jersey Number, etc. -->
		</ul>

		<div class="flex gap-x-4 !mt-4">
			<PrimeButton label="Save" />
			<PrimeButton label="Cancel" severity="secondary" />
		</div>
	</PrimeDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PrimeDialog from "primevue/dialog";
import PrimeInputText from "primevue/inputtext";
import PrimeButton from "primevue/button";

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

const openPlayerDialog = (player) => {
	selectedPlayer.value = player;
	visibleDialog.value = true;
};
</script>

<style scoped>
/* Estilos específicos para o componente PlayerDialog */
</style>
