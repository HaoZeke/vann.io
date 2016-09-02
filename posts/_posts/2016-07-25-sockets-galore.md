---
layout: post
title:  Week 9 &mdash; Sockets galore
date:   2016-07-25 20:00:00 +0100
categories: general
tags: makers
---

I have no idea what happened to the time after week 6, but it has flown by! In that time, I've built a web framework (move aside Express), a convincing clone of Instagram _with_ photo filters, and even a multiplayer game.

One of my favourite group projects has definitely been the multiplayer game. The coaches set a theme of 'useful tools for developers', and out of that, <s>Battletoads</s> BattleCodes was born. It's a happy mix between CodeWars (improve coding skills by completing challenges) and typeracer (race to type the fastest), where players race in real-time to complete code challenges before their opponents.

The reason I enjoyed this so much was because its a _game_ (yay fun), and because there was the challenge of getting real-time, low-latency responses. HTTP relies on a client sending a request, and _then_ the server responding. In a game where speed is crucial, that just won't cut the mustard. With websockets, there's a persistent connection between the client and the server which allows data to be sent and received immediately.

Find the project <a href="https://github.com/vannio/battlecodes" target="_blank">on Github</a>.
