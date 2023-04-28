// @vitest-environment nuxt
import { describe, expect, test } from "vitest";

import indexVue from "../pages/index.vue";
import { mount } from "@vue/test-utils";
import TaskListVue from "../components/TaskList.vue";

describe("Basic Test", async () => {
  const wrapper = mount(indexVue);
  const taskListWrapper = mount(TaskListVue)
  test("should render correctly", () => {
    expect(wrapper.html()).toContain("My List of Tasks");
  });

  test("Has dummy task", () => {
    setTimeout(() => {
        expect(taskListWrapper.html()).toContain("Going to school");
    }, 1000);
  });

  test("Add a new task", async () => {
    const input = wrapper.find("#taskText");
    const button = wrapper.find('[data-target="AddTask"]');
    await input.setValue("New TEST Task");
    await button.trigger("click");
    setTimeout(() => {
        expect(wrapper.html()).toContain("New TEST Task");
    }, 4000);
  });
});
