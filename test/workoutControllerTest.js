const mongoose = require('mongoose');
let request = require('supertest')
const app = require('../app')
const assert = require('assert');
const WorkoutModel = require('../domain/workout')

const mongodbUrl = "mongodb://localhost:27017"

/**
 * Integrationtests
 */


before('DB should be connected', function () {
    it('should be connected to DB', function () {
        assert.equal(mongoose.connection.client.s.url, mongodbUrl + "/gymPlanner")
    });
    it('should clear the DB', function (done) {
        mongoose.connect(mongodbUrl, {useNewUrlParser: true}, () => {
            mongoose.connection.db.dropDatabase(function () {
                done()
            })
        })
    });
})

describe('#WorkoutController Tests', function () {

    context('#GET /workouts', function () {
        it('should respond with array with length 0', function () {
            assert.equal(process.env.MONGO_HOST_LOCAL, "localhost:27017");
            return request(app).get('/workouts')
                .then(res => assert.equal(res.body.length, 0))
        });
    });

    context('#POST /workouts', function () {
        const exercise = {
            name: 'BD',
            achieved: true,
            reps: 3,
            sets: 5,
            kg: 60,
            goal: '3x5'
        }

        const workout = {
            date: '2020-02-02',
            name: 'Push',
            notes: 'random notes',
            exercises: [
                exercise
            ]
        };

        it('should create a new workout', function () {
            return request(app).post('/workouts')
                .send(workout)
                .then(async res => {
                    assert.equal(res.statusCode, 200)
                    assert.equal(res.body.date, workout.date)
                    assert.equal(res.body.name, workout.name)
                    assert.equal(res.body.notes, workout.notes)
                    assert.equal(res.body.exercises[0].name, workout.exercises[0].name)
                    const doc = await WorkoutModel.findById(res.body._id)
                    const newWorkout = JSON.parse(JSON.stringify(doc)) //Workaround because mongoose query returns a documentArray
                    await assert.deepEqual(res.body, newWorkout)
                })
        });

        it('should have 1 workout in the database', async function () {
            return request(app).get('/workouts')
                .then(res => assert.equal(res.body.length, 1))
        })

    });

    context('#PUT /workouts/:id', function () {
        it('should save the edited workout correctly', async function () {
            const doc = await WorkoutModel.findOne({})
            const workout = JSON.parse(JSON.stringify(doc))
            const editedWorkout = {...workout, name: "Pull"}
            return request(app).put('/workouts/' + editedWorkout._id)
                .send(editedWorkout)
                .then(async res => {
                    assert.equal(res.statusCode, 200)
                    assert.deepEqual({...res.body, __v: 1}, editedWorkout) // __v for version key of mongoose object
                    const doc = await WorkoutModel.findById(editedWorkout._id)
                    const editedWorkoutFromDB = JSON.parse(JSON.stringify(doc)) //Workaround because mongoose query returns a documentArray
                    await assert.deepEqual({...res.body, __v: 2}, editedWorkoutFromDB)
                })
        })
    })

    context('#DELETE /workouts/:id', function () {
        it('should respond with array with length 0', async function () {
            const doc = await WorkoutModel.findOne({})
            const workout = JSON.parse(JSON.stringify(doc)) //Workaround because mongoose query returns a documentArray
            return request(app).delete('/workouts/' + workout._id)
                .then(res => {
                    assert.equal(res.statusCode, 200)
                    assert.equal(Object.keys(res.body).length, 0)
                    assert.equal(res.text, 'deleted successfully')
                })
        });
    })
})










