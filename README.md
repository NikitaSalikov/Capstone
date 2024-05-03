# Capstone

go to portal folder: ```cd portal```

install npm: ```sudo npm install```

install the amplify: ```sudo npm install -g @aws-amplify/cli```

pull the amplify resources: ```sudo amplify pull --appId d31fb2nmmf999b --envName dev```

install the AWS libraries: ```sudo npm install aws-amplify @aws-amplify/ui-react```

install the graphql: ```sudo amplify update codegen``` then ```sudo amplify codegen```

install react-router-dom ```sudo npm install react-router-dom```

install react-icons ```sudo npm install react-icons```

install styled-components ```sudo npm install styled-components```

run: ```npm start```.

Some notes:
- To switch between the user and business page, change the current page in index.js
- The user page has no current way to create a chat group.  To add that functionality pass in a receiver into the page, check that it exists when the page is first loaded, and then create a group based on that variable.
- The business page has no way to login as a business.  To connect this page to the website make sure to pass in a location UUID to the page.
- A button has been added to leave the chatbox, but it isn't working as intended
