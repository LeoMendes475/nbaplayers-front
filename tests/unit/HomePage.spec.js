import { mount, flushPromises } from "@vue/test-utils";
import HomePage from "@/pages/home/page.vue";
import PlayerTable from "@/pages/home/components/PlayerTable.vue";
import EditPlayerModal from "@/pages/home/components/EditPlayerModal.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { createTestingPinia } from "@pinia/testing";
import api from "@/services/index";
import { vi } from "vitest";
import PrimeVue from "primevue/config";

vi.mock("@/services/index", () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("HomePage.vue", () => {
  let wrapper;

  beforeEach(async () => {
    api.get.mockResolvedValue({
      data: [
        { id: 1, first_name: "LeBron", last_name: "James", position: "SF" },
        { id: 2, first_name: "Stephen", last_name: "Curry", position: "PG" },
      ],
      meta: { per_page: 10, next_cursor: null },
    });

    wrapper = mount(HomePage, {
      global: {
        plugins: [PrimeVue, createTestingPinia({ createSpy: vi.fn })],
      },
    });

    await flushPromises();
  });

  it("renderiza corretamente", () => {
    expect(wrapper.text()).toContain("NBA Players");
  });

  it("carrega e exibe os jogadores corretamente", async () => {
    expect(wrapper.findComponent(PlayerTable).exists()).toBe(true);
    expect(wrapper.findAll("tr").length).toBe(3); // 2 jogadores + cabeçalho
  });

  it("abre o modal de edição ao chamar openEditPlayer", async () => {
    const player = { id: 1, first_name: "LeBron", last_name: "James", position: "SF" };
    await wrapper.vm.openEditPlayer(player);

    expect(wrapper.findComponent(EditPlayerModal).props("visible")).toBe(true);
  });

  it("abre o modal de confirmação ao chamar OpenConfirmDeleteModal", async () => {
    await wrapper.vm.OpenConfirmDeleteModal(1);

    expect(wrapper.findComponent(ConfirmModal).props("visible")).toBe(true);
  });

  it("deleta um jogador e exibe um toast", async () => {
    api.delete.mockResolvedValue({});
    await wrapper.vm.deletePlayer(1);

    expect(api.delete).toHaveBeenCalledWith("/players/1");
    await flushPromises();

    expect(wrapper.findComponent(ConfirmModal).props("visible")).toBe(false);
  });

  it("exibe erro ao falhar na exclusão", async () => {
    api.delete.mockRejectedValue(new Error("Erro ao deletar"));

    await wrapper.vm.deletePlayer(1);
    await flushPromises();

    expect(api.delete).toHaveBeenCalledWith("/players/1");
    expect(wrapper.findComponent(ConfirmModal).props("visible")).toBe(false);
  });
});
