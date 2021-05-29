class Category {
    constructor(name, icon) {
        this.id = null,
            this.name = name,
            this.icon = icon
    }

    static addBasicCategories() {
        let basicCategories = ['food', 'fun', 'grocery', 'home', 'salary', 'shop', 'transport', 'travel'];
        let categoriesListRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/categories/');
        for (let i = 0; i < basicCategories.length; i++) {
            let category = new Category(basicCategories[i], 'images/' + basicCategories[i] + '_category.png');
            let newCategoriesRef = categoriesListRef.push();
            category.id = newCategoriesRef.key;
            newCategoriesRef.set(category);
        }
    }

    static addCategory(category) {
        return new Promise((resolve, reject) => {
            let categoriesListRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/categories/');
            let newCategoriesRef = categoriesListRef.push();
            category.id = newCategoriesRef.key;
            const storageRef = firebase.storage().ref().child(`images/${category.icon.name}`);
            storageRef.put(category.icon).then((snapshot) => {
                category.icon = 'images/' + category.icon.name;
                newCategoriesRef.set(category);
                return resolve(1);
            });
        });
    }

    static readCategories() {
        return new Promise((resolve, reject) => {
            let categoriesListRef = firebase.database().ref('users/' + localStorage.getItem('currentUserId') + '/categories/');
            categoriesListRef.get().then((snapshot) => {
                if (snapshot.exists()) {
                    return resolve(Object.values(snapshot.val()));
                } else {
                    return [];
                }
            }).catch((error) => {
                console.error(error);
            });
        })
    }

    static getIconURL(iconPath) {
        return new Promise((resolve, reject) => {
            const storageRef = firebase.storage().ref();
            storageRef.child(iconPath).getDownloadURL()
                .then((url) => {
                    if (url) {
                        return resolve(url);
                    } else {
                        return reject('URL for img is null.');
                    }
                })
        });
    }

    static updateCategory(prevCategory, newCategory) {
        return new Promise((resolve, reject) => {
            if (newCategory.icon == null) {
                let updates = {}
                newCategory.icon = prevCategory.icon;
                updates['users/' + localStorage.getItem('currentUserId') + '/categories/' + prevCategory.id] = newCategory;
                firebase.database().ref().update(updates);
                return resolve(1);
            } else {
                this.deleteCategory(prevCategory).then(() => {
                    this.addCategory(newCategory).then(() => {
                        return resolve(1);
                    }).catch((error) => {
                        return reject(error);
                    });
                })
            }
        });
    }

    static deleteCategory(category) {
        return new Promise((resolve, reject) => {
            let categoriesListRef = firebase.database().ref('users/' + localStorage.getItem('currentUserId') + '/categories/' + category.id);
            categoriesListRef.remove();
            const storageRef = firebase.storage().ref();
            storageRef.child(category.icon).delete().then(() => {
                return resolve(1);
            }).catch((error) => {
                return reject(error);
            });
        });
    }
}

export default Category