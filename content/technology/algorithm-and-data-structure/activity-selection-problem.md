---
title: 活动选择问题
---
问题描述：给定一组活动，每个活动有开始时间和结束时间，在这些活动中选择尽可能多的活动，使得它们互不重叠

贪心策略：每次**选择结束时间最早**且**不与已选择的活动重叠**的活动

实现代码

```js
function activitySelection(activities) {
    // 按结束时间排序
    activities.sort((a, b) => a[1] - b[1]);

    let selectedActivities = [];
    let lastEndTime = 0;

    for (let activity of activities) {
        if (activity[0] >= lastEndTime) {
            selectedActivities.push(activity);
            lastEndTime = activity[1];
        }
    }

    return selectedActivities;
}

// 测试代码
const activities = [[1, 4], [3, 5], [0, 6], [5, 7], [3, 9], [5, 9], [6, 10], [8, 11], [8, 12], [2, 14], [12, 16]];
console.log(activitySelection(activities));  // 输出: [[1, 4], [5, 7], [8, 11], [12, 16]]
```
