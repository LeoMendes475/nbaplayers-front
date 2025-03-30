<template>
	<PrimeDialog
		v-model:visible="dialogVisible"
		modal
		header="Edit Player"
		:style="{ width: '50vw' }"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
		class="flex flex-col"
	>
		<ul class="flex flex-col gap-y-4">
			<li class="flex flex-col">
				<span>First name:</span>
				<PrimeInputText
					:modelValue="player?.first_name"
					@update:modelValue="(value: string) => updatePlayer('first_name', value)"
					placeholder="First Name"
				/>
			</li>

			<li class="flex flex-col">
				<span>Last name:</span>
				<PrimeInputText
					:modelValue="player?.last_name"
					@update:modelValue="(value: string) => updatePlayer('last_name', value)"
					placeholder="Last Name"
				/>
			</li>

			<li class="flex flex-col">
				<span>Team:</span>
				<PrimeInputText
					:modelValue="player?.team?.name"
					@update:modelValue="(value: string) => updatePlayer('team', { ...player.team, name: value })"
					placeholder="Team"
				/>
			</li>

			<li class="flex flex-col">
				<span>Position:</span>
				<PrimeInputText
					:modelValue="player?.position"
					@update:modelValue="(value: string) => updatePlayer('position', value)"
					placeholder="Position"
				/>
			</li>

			<li class="flex flex-col">
				<span>Jersey Number:</span>
				<PrimeInputText
					:modelValue="player?.jersey_number"
					@update:modelValue="(value: string) => updatePlayer('jersey_number', value)"
					placeholder="Jersey Number"
				/>
			</li>

			<li class="flex flex-col">
				<span>Height:</span>
				<PrimeInputText
					:modelValue="player?.height"
					@update:modelValue="(value: string) => updatePlayer('height', value)"
					placeholder="Height"
				/>
			</li>

			<li class="flex flex-col">
				<span>Country:</span>
				<PrimeInputText
					:modelValue="player?.country"
					@update:modelValue="(value: string) => updatePlayer('country', value)"
					placeholder="Country"
				/>
			</li>
		</ul>

		<div class="flex gap-x-4 !mt-4">
			<PrimeButton label="Cancel" severity="secondary" @click="closeDialog" />
			<PrimeButton label="Save" @click="saveChanges" />
		</div>
	</PrimeDialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import PrimeDialog from "primevue/dialog";
import PrimeButton from "primevue/button";
import PrimeInputText from "primevue/inputtext";

const props = defineProps({
	player: Object,
	visible: Boolean,
});

const emit = defineEmits(["update:visible", "update:player", "save"]);

const dialogVisible = computed({
	get: () => props.visible,
	set: (value) => emit("update:visible", value),
});

function updatePlayer(field, value) {
	emit("update:player", { ...props.player, [field]: value });
}

function saveChanges() {
	emit("save", props.player);
	closeDialog();
}

function closeDialog() {
	emit("update:visible", false);
}
</script>
