const assert = require('assert');
const WorkoutModel = require('../domain/workout');
let request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../web/dispatcher');

//TODO: Refactor -> needs proper structure
const testApp = express();

const testPort = 8081;
testApp.listen(testPort, () => console.log(`Running on port ${testPort}!`)); // Start app as HTTP server
testApp.use(bodyParser.json());
testApp.use(cors());
testApp.use('', routes); // Configure the dispatcher with all its controllers

/**
 * Relocated methods => DRY principle
 */
const initDB = () => {
    const mongodbUrl = "mongodb://localhost:27017/gymPlanner_testDB";
    mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    describe('Check and prepare DB', function () {
        it('should be connected to DB', function () {
            assert.equal(mongoose.connection.client.s.url, mongodbUrl)
        });
        it('should clear the DB', async function () {
            await mongoose.connect(mongodbUrl, {useNewUrlParser: true},  async () => {
                await mongoose.connection.db.dropDatabase()
            })
        });
    })
};


const getOneWorkoutFromDB = async () => {
    const doc = await WorkoutModel.findOne({});
    const workoutObject = JSON.parse(JSON.stringify(doc)); //Workaround because mongoose query returns a documentArray
    return workoutObject
};

const deleteMongooseGeneratedValues = obj => {
    delete obj._id;
    delete obj.__v;
    if (obj.workout !== undefined) delete obj.workout;
    if (obj.exercises !== undefined) {
        obj.exercises.forEach((e) => deleteMongooseGeneratedValues(e))
    }
    return obj
};

const createWorkout = () => {
    const exercise = {
        name: 'Bench Press',
        achieved: true,
        reps: 3,
        sets: 5,
        kg: 70,
        goal: '3x5'
    };

    const workout = {
        date: '2020-02-02',
        name: 'Push',
        description: 'random notes',
        exercises: [
            exercise
        ]
    };

    it('should create a new workout', function () {
        return request(testApp).post('/workouts')
            .send(workout)
            .then(async res => {
                assert.equal(res.statusCode, 200);
                const responseWorkout = deleteMongooseGeneratedValues({...res.body});
                assert.deepEqual(responseWorkout, workout)
            })
    });

    it('should have 1 workout in the database', async function () {
        return request(testApp).get('/workouts')
            .then(res => assert.equal(res.body.length, 1))
    })
};

const updateWorkout = editedWorkout => {
    return request(testApp).put('/workouts/' + editedWorkout._id)
        .send(editedWorkout)
        .then(async res => {
            assert.equal(res.statusCode, 200);
            const responseWorkout = deleteMongooseGeneratedValues({...res.body});
            const editedWorkout_ = deleteMongooseGeneratedValues({...editedWorkout});
            assert.deepEqual(responseWorkout, editedWorkout_)
        })
};

const deleteWorkout = workout => {
    return request(testApp).delete('/workouts/' + workout._id)
};


module.exports = {
    createWorkout: createWorkout,
    updateWorkout: updateWorkout,
    getOneWorkoutFromDB, getOneWorkoutFromDB,
    initDB, initDB,
    deleteWorkout, deleteWorkout,
    testApp
};
