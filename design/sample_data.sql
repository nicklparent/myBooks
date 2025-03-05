USE my_books;

INSERT INTO books 
(Title, Author, Genre, PageCount, CoverImageUrl)
VALUES 
('Lord Of The Rings', 'J.R.R.Tolkien', 'Fantasy', 1100, 'https://dynamic.indigoimages.ca/v1/books/books/0261102354/1.jpg'),
('Harry Potter', 'J.K. Rowling', 'Fantasy', 2000, NULL),
('Meditations', 'Marcus Aeurlious', 'Classics', 250, 'https://dynamic.indigoimages.ca/v1/books/books/1548249254/1.jpg');

INSERT INTO users
(Username, Email, FirstName, LastName, Password)
VALUES
('John_doe', 'johndoe@example.com', 'John', 'Doe', 'password1'),
('Nicklparent', 'nicklparent@example.com', 'nick', 'parent', 'password2'),
('sampleuser', 'sampleuser@gmail.com', 'sample', 'user', 'password3');


INSERT INTO ratings
(Rating, UserId, BookId)
VALUES
(8.2, 1, 2),
(9.1, 2, 1);

INSERT INTO purchase_links
(BookId, AmazonUrl, IndigoUrl)
VALUES
(3, 'https://www.indigo.ca/en-ca/meditations/9781548249250.html', 'https://www.amazon.ca/Meditations-Marcus-Aurelius/dp/0140449337?crid=1KWX33BMDLG78&dib=eyJ2IjoiMSJ9.SGZrn9To6eESawL2DcQhCXYvhKZKghd2ljfIEk2jwRNNAE04_bsS9Dek5nlFBUgszxi6VIG_i1D2BTtDQ3oe6To6WvNTKsjdsRhWuqshyp48jy6XK5HJUUyBH6ZbJ6BX7BAleyVaj6qyyzheO_pKMr3xfZUM3mKmmaztNh9W6CZaTug4BBI5_kTsKX1vSkYZhpVNiLAlfp-1Q13COlnaorbAVk_ZRpZUNjd4t2zPewDh69pBOciJGdUtMaDaBZWwWptXwseaTeiPr5JfdcsL0meWLMtsE5y-RRCNHSiapEK6EJhgNPA8ES3WsKYhUxGI_uk5SXqXjSFRIdwnKjzaR0DqfVD6l1BexDWc-ltW7yA-TD4ZUgV7O4uIP3SELT4lnw2FTErTU9PFDbF4TQT-tpoMao2-9PLVBvp4AVvZ-7ojqPvvsyjPzdklCkio7WwA.F1-qIClivf8vEoTGnvf0lAlWalXN52ALatHD84cfrM8&dib_tag=se&keywords=meditations&qid=1741190071&sprefix=meditation%2Caps%2C151&sr=8-7'),
(1, 'https://www.indigo.ca/en-ca/the-fellowship-of-the-ring/9780261102354.html', 'https://www.amazon.ca/Fellowship-Ring-Lord-Rings-Book/dp/0261102354?crid=1HSEVXJUYKAF8&dib=eyJ2IjoiMSJ9.lJ983QYtrD2V3iZOOZ3Q9CL9dPxt8DN_OM8OOLDDZYmd9Is3ICMNFseOriLlv7ss0eOAcClNduyDLqJXLxvr9yS7G1IG5UawD3MM0lSe--D9KuLdgtJo6AVAKoc2DH84ii8SoHO7p07KWxZXxugoNXDNguf_Fc7Yk1axwlCV_Ls2lUeYnleh5e63F3jZjNtg8fphSAA-GfjGe4oXBQIe4I07tUcPNaqutNgUJY3phDy7_7RHy8gQUi0ftZ7E7eN21dg8n2PkV92J0NOFstu_h7lX1hIFWBdwz2pEUkf98a9NPLfjxaWwCFeBmEAwq9LVHb7d9s9278y2kD4ZGm0fdiHGQdMkRI4AMBNjm5GJieI5o9vwcEsjQvCSy2wZS-6wsfA8Aw76LrYxZ9o6jVi9DLZscaKkGZODkRk2dwskoMVOa4-v4AAWLWw78fzxcgjC.Ma6brlHusK68uX1vJbH_sBw9K4Q8Fgnd8iHDNuV1yJU&dib_tag=se&keywords=lord+of+the+rings&qid=1741189952&sprefix=lord+of+%2Caps%2C168&sr=8-9');

INSERT INTO currently_reading
(UserId, BookId)
VALUES
(1, 1),
(2, 1);

INSERT INTO want_to_read
(UserId, BookId)
VALUES
(1, 2),
(2, 3);