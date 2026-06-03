## Création d'une tâche ##

$body = @{
  title = "Tache persistante"
  description = "Cette tache doit survivre au redemarrage"
  status = "todo"
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://localhost:3001/api/tasks" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body


  résultat :

id          : 63960c1c-fd68-466b-88d8-4b500bcaccfb                                                                                                                                                               
title       : Tache persistante
description : Cette tache doit survivre au redemarrage
status      : todo
createdAt   : 2026-06-03T13:29:42.744Z
updatedAt   : 2026-06-03T13:29:42.744Z

## Arrêt de la stack ##

docker compose down

## Relance de la stack ##

docker compose up -d

## verification après relance ##

curl http://localhost:3001/api/tasks

résultats :

StatusCode        : 200
StatusDescription : OK
Content           : [{"id":"63960c1c-fd68-466b-88d8-4b500bcaccfb","title":"Tache persistante","description":"Cette tache doit survivre au 
                    redemarrage","status":"todo","createdAt":"2026-06-03T13:29:42.744Z","updatedAt":"2...
RawContent        : HTTP/1.1 200 OK
                    Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 's...
Forms             : {}
Headers           : {[Content-Security-Policy, default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 
                    'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests], [Cross-Origin-Opener-Policy, same-origin], [Cross-Origin-Resource-Policy, same-origin], 
                    [Origin-Agent-Cluster, ?1]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 226
