USE my_books;

INSERT INTO books 
(Title, Author, Genre, PageCount)
VALUES 
(`Lord Of The Rings`, `J.R.R.Tolkien`, `Fantasy`, 1100),
(`Harry Potter`, `J.K. Rowling`, `Fantasy`, 2000),
(`Meditations`, `Marcus Aeurlious`, `Classics`, 250);

INSERT INTO users
(Username, Email, FirstName, LastName, Password)
VALUES
(`John_doe`, `johndoe@example.com`, `John`, `Doe`, `password1`),
(`Nicklparent`, `nicklparent@example.com`, `nick`, `parent`, `password2`),
(`sampleuser`, `sampleuser@gmail.com`, `sample`, `user`, `password3`);
