import { EventEmitter } from 'events'
const store = new EventEmitter()
import moment from 'moment'
import Firebase from 'firebase'
const api = new Firebase('https://torrid-inferno-4476.firebaseio.com/')
const postsRef = api.child('posts')
const usersRef = api.child('users')
// const itemsCache = Object.create(null)
const postsPerPage = store.postsPerPage = 30

// I have two copies which is dumb as HECK
let newPosts = []
let postsDict = []

store.loggedIn = false

export default store

// Set callback for login events
api.onAuth(updateLogin)

// Update feed as new posts arrive
api.child('posts').on('value', snapshot => {
  postsDict = snapshot.val()
  newPosts = []
  // this is REAL dumb
  for (var key in postsDict) {
    var postObj = postsDict[key]
    postObj.id = key
    postsDict[key].id = key
    newPosts.unshift(postObj)
  }
  store.emit('newposts-updated')
})

// this is strictly a worse version of:
// https://github.com/vuejs/vue-hackernews/blob/gh-pages/src/store/index.js

console.log(postsPerPage)
console.log(newPosts)

function updateLogin () {
  var authData = api.getAuth()
  if (authData) {
    store.loggedIn = true
    store.emit('auth-changed')
  } else {
    store.loggedIn = false
    store.emit('auth-changed')
  }
}

store.fetchPosts = function () {
  return newPosts
}

store.fetchPost = function (id) {
  return postsDict[id]
}

store.createPost = function (body) {
  var authData = api.getAuth()
  if (authData) {
    postsRef.push().set({
      author: authData.uid,
      likes: 0,
      dislikes: 0,
      body: body,
      time: moment().format(),
      numcomments: 0,
      comments: [],
      participants: []
    })
  }
}

store.comment = function (id, body) {
  var authData = api.getAuth()
  if (authData) {
    postsRef.child(id).child('comments').push({
      body: body,
      author: authData.uid,
      time: moment().format()
    })

    postsRef.child(id).child('numcomments').transaction(function (nC) {
      return nC + 1
    })
  }
}

store.like = function (id, post) {
  var authData = api.getAuth()
  if (authData) {
    if (post) {
      usersRef.child(authData.uid).child(id).once('value', function (snap) {
        var liked = snap.val()
        console.log(liked)
        if (liked === null) {
          postsRef.child(id).child('likes').transaction(function (cL) {
            return cL + 1
          })
          usersRef.child(authData.uid).child(id).set({liked: true, disliked: false})
        } else if (liked.liked === false) {
          postsRef.child(id).child('likes').transaction(function (cl) {
            return cl + 1
          })
          if (liked.disliked === true) {
            postsRef.child(id).child('dislikes').transaction(function (cD) {
              return cD - 1
            })
          }
          usersRef.child(authData.uid).child(id).set({liked: true, disliked: false})
        } else {
          postsRef.child(id).child('likes').transaction(function (cL) {
            return cL - 1
          })
          usersRef.child(authData.uid).child(id).set({liked: false, disliked: false})
        }
      })
    }
  }
}

store.dislike = function (id, post) {
  var authData = api.getAuth()
  if (authData) {
    if (post) {
      usersRef.child(authData.uid).child(id).once('value', function (snap) {
        var liked = snap.val()
        console.log(liked)
        if (liked === null) {
          postsRef.child(id).child('dislikes').transaction(function (cD) {
            return cD + 1
          })
          usersRef.child(authData.uid).child(id).set({liked: false, disliked: true})
        } else if (liked.disliked === false) {
          postsRef.child(id).child('dislikes').transaction(function (cD) {
            return cD + 1
          })
          if (liked.liked === true) {
            postsRef.child(id).child('likes').transaction(function (cL) {
              return cL - 1
            })
          }
          usersRef.child(authData.uid).child(id).set({liked: false, disliked: true})
        } else {
          postsRef.child(id).child('dislikes').transaction(function (cD) {
            return cD - 1
          })
          usersRef.child(authData.uid).child(id).set({liked: false, disliked: false})
        }
      })
    }
  }
}

