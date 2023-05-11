class DB {
    constructor(Schema) {
        this.Schema = Schema;
    }
    //create
    add = async (object) => {
        const createdItem = new this.Schema({ ...object });
        try {
            await createdItem.save();
        } catch (err) {
            return ({ message: 'Failed to save. Please try again.' });
        };
        return (createdItem);
    }
    //read
    get = async () => {
        let allData;
        try {
            allData = await this.Schema.find({}, '-password').exec();
        } catch (err) {
            return ({ message: 'Failed to get data. Please try again.' });
        };
        return (allData);
    }

    getById = async (id) => {
        //return item by item id
        let item;
        try {
            item = await this.Schema.findById(id);
        } catch (err) {
            return ({ message: 'Failed to get data. Please try again.' });
        };
        return (item);
    }

    getByUserId = async (userId) => {
        //return items by userId
        let itemsArray;
        try {
            itemsArray = await this.Schema.find({ userId: userId });
        } catch {
            return ({ message: 'Failed to get data. Please try again.' });
        };
        return (itemsArray);
    }

    find = async (filter) => {
        const queriedItem = await this.Schema.findOne(filter);
        return (queriedItem);
    }

    findMany = async (filter) => {
        const queriedItem = await this.Schema.find(filter);
        return (queriedItem);
    }
    //update
    update = async (id) => {
        let doc;
        try {
            doc = await this.Schema.findById(id);
        } catch {
            return ({ message: 'Could not update. PLease try again.' });
        }
        const callback = () => { doc.save({
            validateModifiedOnly: true,
          }) };

        return ({ doc: doc, save: callback });
    }

    // updateCol = (id, key, value) => {
    //     //users.updateCol('nIGH6-jm_O97gs_qiw6-p', 'name', 'hello');
    //     const data = this.get();
    //     const index = data.findIndex(i => i.id === id);

    //     data[index][key] = value;

    //     this.save(data);
    // }

    //delete
    del = async (id) => {
        const doc = await this.Schema.findById(id);
        try {
            await doc.remove();
        } catch (error) {
            return ({ message: 'Could not delete item' });
        };
    }
}

module.exports = DB;