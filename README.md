# GoldFish
clone of Evernote


When on the splash page of GoldFish, you will have three options.   Sign Up as a new user, Log In as an existing user, or to click the Demo User button to try out the functionality of the application as if an existing user.   

Sign Up requires an email address, username and two password input fields that are required to match.  The user can click the Home link if they decide not to Sign Up.  

The Log In button renders a modal with 2 input fields.  The first takes either the email or username, the second input field for password.   On submission, checks that the password matches what the username or email would require.   

The Demo button auto logs to check out site with more ease.

After successful log In, on user's home page, the user's Notebowl's (Notebooks) will be rendered as a list, with a Main notebowl that is used as the general notebowl for daily use.  The Main notebowl does not offer a delete button.  All other notebowls have a delete button.   If the user decides to delete a notebowl, it will delete the notes included as well.  Under the Notebowls, a '+' button will render a form to input a title for a new notebowl.  The notebowls are ordered by how recently they've been updated.   If the user clicks on a notebowl title, the application renders that Notebowl's Notes in the same 'updated' fashion.   If there are no notes, only a '+' renders.  If the user clicks this button, a form renders with available input fields for title and content.  The user can submit it or cancel out of the form.   Functionality is similar for the Notes listed, having a delete button (for every note) available, and a clickable title to view the note itself.  When the note is rendered, the user can change the title or content at will which updates to the database as changes are made.   The user can use the close button to close the note as expected.   With a note open, one can click on the different notes listed above to switch to them, or can click on a notebowl to change the notes list.  Clicking on a different notebowl does not change the open note.  Only clicking on other notes will cause the open note to change.

When the user is finished, the can click on the user profile button to be offered a log out button, taking them back to the splash page.