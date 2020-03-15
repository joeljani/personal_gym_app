let request = require('supertest')
const app = require('../app')
const assert = require('assert');
const testHelper = require('../test/testHelper')


/**
 * Integrationtests
 */

describe('#WorkoutController basic CRUD Tests', function () {

    //TODO: bug fix before
    before(async () => await testHelper.initDB())

    context('#GET /workouts', function () {
        it('should respond with array with length 0', function () {
            return request(app).get('/workouts')
                .then(res => assert.equal(res.body.length, 0))
        });
    });

    context('#POST /workouts', function () {
        testHelper.createWorkout()
    });

    context('#PUT /workouts/:id', function () {
        it('should save the edited workout correctly', async function () {
            const workout = await testHelper.getOneWorkoutFromDB()
            const editedWorkout = {...workout, name: "Pull"}
            return testHelper.updateWorkout(editedWorkout)
        })
    })

    context('#DELETE /workouts/:id', function () {
        it('should respond with array with length 0', async function () {
            const workout = await testHelper.getOneWorkoutFromDB()
            return request(app).delete('/workouts/' + workout._id)
                .then(res => {
                    assert.equal(res.statusCode, 200)
                    assert.equal(Object.keys(res.body).length, 0)
                    assert.equal(res.text, 'deleted successfully')
                })
        });
    })

})

describe('#WorkoutController and exerciseService integration tests', function () {

    before(async () => {
        await testHelper.initDB()
    })

    testHelper.createWorkout()

    context('#PUT /workouts/:id', function () {
        it('should save the edited exercise correctly', async function () {
            const workout = await testHelper.getOneWorkoutFromDB()
            const exercise = workout.exercises[0]
            const editedExercise = {...exercise, name: "Deadlift"}
            const editedWorkout = {...workout, exercises: [editedExercise]}
            return testHelper.updateWorkout(editedWorkout)
        })

        it('should save the new added exercise correctly', async function () {
            const workout = await testHelper.getOneWorkoutFromDB()
            const newExercise = {
                name: 'Pull up',
                achieved: true,
                reps: 10,
                sets: 4,
                kg: 0,
                goal: '10x4'
            }
            const editedWorkout = {...workout, exercises: workout.exercises.concat(newExercise)}
            return testHelper.updateWorkout(editedWorkout)
        })

        it('should return an array of length 2', async function () {
            return request(app).get('/exercises')
                .then(res => assert.equal(res.body.length, 2))
        })

    })
})












