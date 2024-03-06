import * as todoApi from '../todo';

describe('Mocking TODO API', () => {
  jest.mock('firebase/compat/app', () => ({
    firestore: jest.fn(() => ({
      Timestamp: {
        fromDate: jest.fn((date) => date),
        now: jest.fn(() => 'mocked-timestamp'),
      },
    })),
  }));

  jest.mock('../../db/firebase', () => ({
    collection: jest.fn(() => ({
      add: jest.fn(() => Promise.resolve({ id: 'mocked-id' })),
      withConverter: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({
          docs: [
            { data: () => ({ title: 'Task 1' }), id: 'task1-id' },
            { data: () => ({ title: 'Task 2' }), id: 'task2-id' },
          ],
        })),
      })),
      doc: jest.fn(() => ({
        update: jest.fn(() => Promise.resolve()),
        delete: jest.fn(() => Promise.resolve()),
      })),
    })),
  }));
})

  // jest.mock('../../db/firebase', () => {
  //   return {
  //     firestore: jest.fn(() => ({
  //       collection: jest.fn(() => ({
  //         doc: jest.fn(() => ({
  //           update: jest.fn(() => Promise.resolve())
  //         }))
  //       }))
  //     }))
  //   };
  // });

  describe('createTask', () => {
    it('should create a task', async () => {
      const taskId = await todoApi.createTask('Title', 'Description', new Date(), true, false);
      expect(taskId).toBeTruthy();
    });

    // Add more tests for error cases if needed
  });

  describe('getTasks', () => {
    it('should get a list of tasks', async () => {
      const tasks = await todoApi.getTasks();
      // expect(tasks).toEqual([
      //   { data: { title: 'Task 1' }, id: 'task1-id' },
      //   { data: { title: 'Task 2' }, id: 'task2-id' },
      // ]);
      expect(tasks.length).toBeGreaterThan(0);
    });

    // Add more tests for error cases if needed
  });

  // describe('updateTask', () => {
  //   it('should update a task', async () => {
  //     const taskId = await todoApi.updateTask('task1-id', { isProgress: true });
  //     expect(taskId).toBe('task1-id');
  //     // expect(taskId).toHaveBeenCalled();
  // });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const taskId = await todoApi.deleteTask('task1-id');
      console.log(taskId, 'deltask');
      expect(taskId).toBe('task1-id');
    });

    // Add more tests for error cases if needed
  });
