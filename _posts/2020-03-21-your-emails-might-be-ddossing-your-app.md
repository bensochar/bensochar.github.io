---
layout: post
title:  Your Emails Might be DDoSing Your App
date:   2023-01-16 19:00 -0500
tags:   [email]
---
If you've got a bunch of B2B customers, you might notice big spikes in traffic after a big email campaign. 

Several years ago this was happening to us at Ellevate forcing servers to scale & costing us $$$.

After some digging through our logs, I noticed a similar set of IPs making _thousands_ of requsts. A whois on the IPs led to a few IT consultants...:thinking_face:. 

Some things I noticed:

1. Usually started within an hour or so of our newsletter going out.
1. The requests were grouped by IP. Like 1 IP would make 5 requests millisends apart. Another IP makes 5 requests...
1. Requests were just about always in the same order.

I had a theory. Do companies test links in emails for phishing?

I spoke to my buddy in IT & it turns out this in a thing. Some IT depts have an "sandbox" server that collect all incoming emails. They parse out the urls & request each one to see if something like a zip or exe file comes down. 

