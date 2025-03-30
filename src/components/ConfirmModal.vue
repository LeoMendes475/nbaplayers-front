<template>
	<PrimeDialog
		:visible="modalVisible"
		modal
		:header="title"
		:style="{ width: '30vw' }"
		:breakpoints="{ '1199px': '40vw', '575px': '80vw' }"
		class="flex flex-col"
	>
		<p class="text-lg !py-4">{{ message }}</p>

		<div class="flex justify-end gap-4 mt-4">
			<PrimeButton :label="cancelLabel" severity="secondary" @click="cancel" />
			<PrimeButton
				:label="confirmLabel"
				:severity="confirmSeverity"
				@click="confirm"
			/>
		</div>
	</PrimeDialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import PrimeDialog from "primevue/dialog";
import PrimeButton from "primevue/button";

const props = defineProps({
	visible: Boolean,
	title: {
		type: String,
		default: "Confirm Action",
	},
	message: {
		type: String,
		default: "Are you sure you want to proceed?",
	},
	confirmLabel: {
		type: String,
		default: "Confirm",
	},
	cancelLabel: {
		type: String,
		default: "Cancel",
	},
	confirmSeverity: {
		type: String,
		default: "danger", // Pode ser "primary", "secondary", "success", etc.
	},
});

const emit = defineEmits(["update:visible", "confirm", "cancel"]);

const modalVisible = computed({
	get: () => props.visible,
	set: (value) => emit("update:visible", value),
});

function confirm() {
	emit("confirm");
	emit("update:visible", false);
}

function cancel() {
	emit("cancel");
	emit("update:visible", false);
}
</script>
