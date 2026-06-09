import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.goto('/');
});

test('covers add, edit, toggle, toggle-all, filter, clear-completed, and reload persistence', async ({
  page,
}) => {
  const newTodo = page.getByPlaceholder('What needs to be done?');
  const todoItems = page.locator('.todo-list li');

  await newTodo.fill('Write tests');
  await newTodo.press('Enter');
  await expect(newTodo).toHaveValue('');

  await newTodo.fill('Refill coffee');
  await newTodo.press('Enter');

  await expect(todoItems).toHaveCount(2);
  await expect(todoItems.nth(0)).toContainText('Write tests');
  await expect(todoItems.nth(1)).toContainText('Refill coffee');

  await todoItems.nth(0).getByText('Write tests').dblclick();
  const editInput = todoItems.nth(0).getByLabel('Edit Write tests');
  await expect(editInput).toBeFocused();
  await editInput.fill('Write E2E tests');
  await editInput.press('Enter');

  const editedTodo = todoItems.filter({ hasText: 'Write E2E tests' });
  const coffeeTodo = todoItems.filter({ hasText: 'Refill coffee' });

  await expect(editedTodo).toHaveCount(1);
  await editedTodo.getByRole('checkbox').check();
  await expect(editedTodo).toHaveClass(/completed/);

  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Write E2E tests');
  await expect(page.getByRole('link', { name: 'Completed' })).toHaveClass(
    /selected/,
  );

  await page.getByRole('link', { name: 'Active' }).click();
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Refill coffee');
  await expect(page.getByRole('link', { name: 'Active' })).toHaveClass(
    /selected/,
  );

  await page.getByRole('link', { name: 'All' }).click();
  await expect(todoItems).toHaveCount(2);

  const toggleAll = page.getByLabel('Mark all as complete');
  await toggleAll.check();
  await expect(page.locator('.todo-list li.completed')).toHaveCount(2);
  await expect(toggleAll).toBeChecked();

  await toggleAll.uncheck();
  await expect(page.locator('.todo-list li.completed')).toHaveCount(0);
  await expect(toggleAll).not.toBeChecked();

  await editedTodo.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Clear completed' }).click();
  await expect(todoItems).toHaveCount(1);
  await expect(coffeeTodo).toHaveCount(1);
  await expect(page.getByText('Write E2E tests')).toHaveCount(0);
  await expect(
    page.getByRole('button', { name: 'Clear completed' }),
  ).toHaveCount(0);

  await page.reload();
  await expect(todoItems).toHaveCount(1);
  await expect(todoItems.first()).toContainText('Refill coffee');
});
