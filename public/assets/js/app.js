
const delete_btn = document.querySelectorAll('.delete');
const save_btn = document.querySelectorAll('.save');
const note_delete = document.querySelectorAll('.note_delete');

delete_btn.forEach(single_delete => {
    single_delete.addEventListener('click', (e) => {
        let id = single_delete.dataset.id;
        e.preventDefault();
        deleteData(`/api/articles/dismiss/${id}`);
        saveData(`/api/articles/save/${id}`);
        location.reload();
    })
});
save_btn.forEach(single_save => {
    single_save.addEventListener('click', (e) => {
        let id = single_save.dataset.id;
        e.preventDefault();
        saveData(`/api/articles/save/${id}`);
        location.reload();
    })
});
note_delete.forEach(single_note => {
    single_note.addEventListener('click', (e) => {
        let id = single_note.dataset.id;
        e.preventDefault();
        deleteData(`/api/notes/${id}`);
        location.reload();
    })
});

const deleteData = (url) => {
    return fetch(url, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    }).then(res =>
      res.json()
      .then(json => {
        return json;
      })
    );
};
const saveData = (url) => {
    return fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    }).then(res =>
      res.json()
      .then(json => {
        return json;
      })
    );
};