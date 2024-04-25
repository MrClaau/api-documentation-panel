# API DOCUMENTATIO PANEL

Live test view <a href="https://example-docs.clau.es" target='_blank'>here</a>
-----

I have created this fully customisable panel for anyone who needs to have API documentation. I have created it mainly for my own use as a programmer and I share it freely with anyone who might be interested. <br />

For now the application has no control panel or admin account, the pages, as well as the whole web is modified from a configuration file called: config.json

In the future I plan to add an administration panel from which to add and edit all the documentation.

Finally I would like to thank <a href="https://www.codingnepalweb.com/">CodingNepal</a> for the sidebar. It has been used one of his sidebars published on the web as a basis for the development of this panel.

<img src="https://github.com/MrClaau/api-docs-tool/blob/main/image1.png" />

## Installation instructions:

- Download the app file
- Modify in the .env the port of the website, or in case you want the SSL files (in this case the port will automatically change to 443).
- Edit in the config folder the ‘config.json’ file and add all your necessary pages, urls, parameters, responses.
- Edit the file homePage.html, this will be displayed on the Home page, you can add css with a style tag or over the tags themselves.
- Start the application with the command `node ./dist/index.js`.
- Modify the config when needed and restart the application.
- (optional) You can use PM2 to keep your panel always open and re-activate after server restarts.

## Features:
- Divides each API path by categories.
- It marks the type of request it is.
- Multiple responses are shown as well as an example response for each of these.
- Parameters for header and body.

## Future implementations:
- SQL
- Admin account
- Admin panel
- Api tester