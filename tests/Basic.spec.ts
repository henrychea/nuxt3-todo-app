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
        expect(taskListWrapper.html()).toContain("Hello Todo");
    }, 1000);
  });

  test("Add a new task", async () => {
    const titleInput = wrapper.find("#taskText");
    const descInput = wrapper.find("#taskDescription");
    const prioritySelect = wrapper.find("#taskPriority");
    const dueDateInput = wrapper.find("#taskDueDate");
    const button = wrapper.find('[data-target="AddTask"]');
    await titleInput.setValue("New TEST Task");
    await descInput.setValue("New TEST Task Description");
    await prioritySelect.setValue("high");
    await dueDateInput.setValue("10/10/2021");

    await button.trigger("click");
    setTimeout(() => {
        expect(wrapper.html()).toContain("New TEST Task");
    }, 4000);
  });
});
