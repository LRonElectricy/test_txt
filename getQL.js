// var json = require('../funcs/getJSON');

class getQL {
    // dist = null
    // root = null
    // constructor(dist, root) {
    //     this.dist = dist
    //     this.root = root
    //     if (!this.value) {
    //         this.create()
    //     }
    // }
    // create = function () {
    //     var QL_unsorted = json.getJSON(this.dist, this.root);
    //     if (QL_unsorted) {
    //         let QL_sorted = sortList(QL_unsorted)
    //         QL_sorted.forEach(element => {
    //             element.status = 'await'
    //             if (element.quests) {
    //                 if (element.quests.length > 1) {
    //                     element.quests = sortList(element.quests)
    //                     element.quests.forEach(quest => {
    //                         quest.status = 'await'
    //                     })
    //                 }
    //             }
    //         });
    //         this.value = QL_sorted
    //     }
    //     this.value = QL_unsorted
    // }
    create = function (ql) {
        // console.log('creating new ql:',ql);
        var QL_unsorted = JSON.parse(ql);
        QL_unsorted = QL_unsorted.QuestLines
        if (QL_unsorted) {
            let QL_sorted = sortList(QL_unsorted)
            QL_sorted.forEach(element => {
                element.status = 'await'
                if (element.quests) {
                    if (element.quests.length > 1) {
                        element.quests = sortList(element.quests)
                        element.quests.forEach(quest => {
                            quest.status = 'await'
                        })
                    }
                }
            });
            this.value = QL_sorted
        }
        this.value = QL_unsorted
    }
    value = null
    income = function (payload) {
        let msg = JSON.parse(payload)
        if (msg.target === 'quest') {
            if (msg.action_type === 'status') {
                this.getQuest(msg.target_id).status = msg.status
            }
        }
    }
    string = function () {
        return JSON.stringify(this.value)
    }
    log = function () {
        this.value.forEach(element => {
            console.log(element);
        });
    }
    getQuest = function (quest_id) {
        let res = null
        this.value.forEach(ql => {
            ql.quests.forEach(quest => {
                if (quest.id === quest_id) {
                    res = quest
                }
            })
        })
        return res
    }
}

function sortList(list) {
    let sorted_list = list.sort((a, b) => (a.order > b.order) ? 1 : -1)
    return sorted_list
}

module.exports = getQL;
